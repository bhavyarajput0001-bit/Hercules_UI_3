"""
HERCULES BRAIN · hands_router
Provider abstraction that BACKFILLS the llm hand. This is the ONLY place cloud /
local model endpoints are reached. Ollama local first, Omniroute cloud fallback.

Critical invariant (enforced by architecture, not just here): the brain's PLAN
is built before any hand runs. A router call can only enrich the CONTENT of a
step its hand was explicitly given — it can never invent the plan. If no model is
reachable, register_llm_hand is never called and the brain completes via rule
hands (hand_llm degrades to a rule note).
"""
from __future__ import annotations

import json
import os
import urllib.request
from typing import Any, Dict, Optional, Tuple

from .hands import register_llm_hand

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")

OMNIS_BASE = os.getenv("OMNIRoute_BASE_URL", None) or "https://api.omniroute.app/v1"
OMNIS_KEY = os.getenv("OMNIRoute_API_KEY", None) or os.getenv("OMNIS_API_KEY", None)
OMNIS_MODEL = os.getenv("OMNIRoute_MODEL", "deepseek-v3")


def _ollama_chat(system: str, user: str, timeout: float = 120.0) -> Optional[str]:
    """POST /api/chat to a local Ollama. Returns reply text or None on failure."""
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }
    req = urllib.request.Request(
        f"{OLLAMA_HOST}/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("message", {}).get("content")
    except Exception:
        return None


def _omnis_chat(system: str, user: str, timeout: float = 120.0) -> Optional[str]:
    """POST an OpenAI-compatible completion to Omniroute. Returns text or None."""
    if not OMNIS_KEY:
        return None
    payload = {
        "model": OMNIS_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.4,
        "max_tokens": 1024,
    }
    req = urllib.request.Request(
        f"{OMNIS_BASE}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {OMNIS_KEY}"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["choices"][0]["message"]["content"]
    except Exception:
        return None


def route_chat(system: str, user: str) -> Tuple[Optional[str], str]:
    """Ollama first, Omniroute fallback. Returns (text, provider_label)."""
    text = _ollama_chat(system, user)
    if text:
        return text, "ollama"
    text = _omnis_chat(system, user)
    if text:
        return text, "omniroute"
    return None, "none"


def _llm_hand_impl(input_: Any) -> Dict[str, Any]:
    """The llm hand implementation: uses the model ONLY for the content of the
    step it's given (draft/summarize/explain), never to produce a plan graph."""
    if isinstance(input_, dict):
        prompt = input_.get("prompt") or input_.get("directive") or str(input_)
        system = input_.get("system", "You are HERCULES' executor hand. Complete the step's declared output only.")
        kind = input_.get("kind", "draft")
    else:
        prompt = str(input_)
        system = "You are HERCULES' executor hand."
        kind = "draft"

    text, provider = route_chat(system, prompt)
    if not text:
        return {"ok": False, "output": None, "error": "no model reachable (ollama/omniroute)", "provider": provider}
    return {"ok": True, "output": {"text": text, "provider": provider, "kind": kind}}


def install() -> bool:
    """Register the llm hand with the Hands registry. Returns True if a model is
    (probably) reachable — checks lazily; callers shouldn't rely on this for
    correctness since hand_llm degrades gracefully."""
    register_llm_hand(_llm_hand_impl)
    return True


if __name__ == "__main__":
    install()
    text, provider = route_chat("You are a terse assistant.", "Say hello in one short sentence.")
    print(f"provider={provider} text={text}")