"""OmniRoute AI Client Wrapper for Hercules Core"""
import os
from openai import AsyncOpenAI
from typing import Optional, Dict, Any, List
from app.config import get_settings

class OmniRouteClient:
    """Wrapper for OmniRoute AI gateway using OpenAI-compatible API"""

    def __init__(
        self,
        base_url: Optional[str] = None,
        api_key: Optional[str] = None
    ):
        settings = get_settings()
        self.base_url = base_url or settings.OMNIROUTE_BASE_URL
        self.api_key = api_key or settings.OMNIROUTE_API_KEY

        # Initialize async client
        self.async_client = AsyncOpenAI(
            base_url=f"{self.base_url}/v1",
            api_key=self.api_key
        )

    async def generate_text(
        self,
        prompt: str,
        model: str = "auto/coding",
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """Generate text using OmniRoute's multi-model routing"""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        create_kwargs = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
        }
        if max_tokens is not None:
            create_kwargs["max_tokens"] = max_tokens
        create_kwargs.update(kwargs)

        response = await self.async_client.chat.completions.create(**create_kwargs)

        return {
            "text": response.choices[0].message.content,
            "model": response.model,
            "tokens_used": response.usage.total_tokens if response.usage else None,
            "finish_reason": response.choices[0].finish_reason
        }

    async def generate_stream(
        self,
        prompt: str,
        model: str = "auto/coding",
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ):
        """Generate streaming text using OmniRoute"""
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        # Build kwargs excluding None values
        create_kwargs = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "stream": True,
        }
        if max_tokens is not None:
            create_kwargs["max_tokens"] = max_tokens
        create_kwargs.update(kwargs)

        stream = await self.async_client.chat.completions.create(**create_kwargs)

        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    async def list_models(self) -> List[Dict[str, Any]]:
        """List available models through OmniRoute"""
        try:
            models = await self.async_client.models.list()
            return [
                {
                    "id": model.id,
                    "name": model.id,
                    "provider": "omniroute",
                    "capabilities": ["chat", "completion"],
                    "context_window": 128000,
                    "cost_per_1k_input": 0.0,
                    "cost_per_1k_output": 0.0,
                    "is_free": "free" in model.id.lower()
                }
                for model in models.data
            ]
        except Exception as e:
            print(f"Error fetching models from OmniRoute: {e}")
            return []

    def get_routing_strategies(self) -> List[str]:
        """Returns available OmniRoute routing strategies"""
        return [
            "auto",
            "auto/coding",
            "auto/fast",
            "auto/cheap",
            "auto/best",
            "priority",
            "fusion",
            "mimo-v2.5-free",
            "nvidia/nemotron",
            "claude-sonnet-4.5",
        ]


# Global client instance
omniroute_client = OmniRouteClient()

def get_omniroute_client() -> OmniRouteClient:
    """Dependency injection for FastAPI routes"""
    return omniroute_client