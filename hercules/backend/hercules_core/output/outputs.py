"""
Hercules Dual Output Subsystem — Voice & Chat Output Channels
"""

import re
from typing import Dict, Any

class VoiceOutput:
    """Formats natural, high-clarity voice strings for TTS vocalization."""

    def __init__(self):
        self.channel = "Voice Output"

    def format_speech(self, text: str, max_chars: int = 140) -> str:
        clean = re.sub(r"[#*_`~>\[\]()|]", "", text)
        clean = re.sub(r"\s+", " ", clean).strip()
        if len(clean) > max_chars:
            clean = clean[:max_chars].rsplit(" ", 1)[0] + "..."
        return clean

class ChatOutput:
    """Formats rich Markdown, code cards, and UI console outputs."""

    def __init__(self):
        self.channel = "Chat Output"

    def format_chat(self, raw_report: str, execution_result: Dict[str, Any]) -> str:
        return raw_report

voice_output = VoiceOutput()
chat_output = ChatOutput()
