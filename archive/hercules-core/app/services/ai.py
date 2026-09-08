"""AI Service - handles LLM interactions via OmniRoute"""
from typing import AsyncIterator, Optional
from datetime import datetime
import uuid
from app.models import (
    ModelInfo, ChatMessage, SubmitPromptInput, StreamChunk, CommandIntent
)
from app.services.omniroute import get_omniroute_client

class AIService:
    def __init__(self):
        self._conversations = {}
        self._omniroute = get_omniroute_client()

    async def models(self):
        models_data = await self._omniroute.list_models()
        return [ModelInfo(**m) for m in models_data]

    async def conversation(self, id):
        return self._conversations.get(id, [])

    async def conversations(self):
        return [
            {
                "id": cid,
                "title": msgs[0].content[:50] if msgs else "Empty",
                "at": msgs[-1].at if msgs else datetime.utcnow().isoformat(),
                "preview": msgs[-1].content[:100] if msgs else ""
            }
            for cid, msgs in self._conversations.items()
        ]

    async def submit(self, input):
        conversation_id = input.conversationId
        message_id = str(uuid.uuid4())
        
        if conversation_id not in self._conversations:
            self._conversations[conversation_id] = []
        
        user_msg = ChatMessage(
            id=str(uuid.uuid4()),
            conversationId=conversation_id,
            role="user",
            content=input.text,
            at=datetime.utcnow().isoformat()
        )
        self._conversations[conversation_id].append(user_msg)
        
        model = "auto/coding"
        system_prompt = "You are HERCULES, an AI operating system assistant. Be concise and helpful."
        
        full_response = ""
        async for delta in self._omniroute.generate_stream(
            prompt=input.text,
            model=model,
            system_prompt=system_prompt,
            temperature=0.7
        ):
            full_response += delta
            yield StreamChunk(
                conversationId=conversation_id,
                messageId=message_id,
                delta=delta
            )
        
        assistant_msg = ChatMessage(
            id=message_id,
            conversationId=conversation_id,
            role="assistant",
            content=full_response,
            at=datetime.utcnow().isoformat(),
            model=model
        )
        self._conversations[conversation_id].append(assistant_msg)
        
        yield StreamChunk(
            conversationId=conversation_id,
            messageId=message_id,
            done=True
        )

    async def stop(self, conversationId):
        pass

    async def actAsIntent(self, text):
        text_lower = text.lower()
        if text_lower.startswith(("open ", "go to ", "show ")):
            return CommandIntent(
                verb="open",
                targetKind="screen",
                targetLabel=text.split(" ", 1)[1] if " " in text else "",
                confidence=0.8
            )
        return None

    async def summarize(self, taskId):
        return f"Summary for task {taskId} (generated via OmniRoute)"

ai_service = AIService()