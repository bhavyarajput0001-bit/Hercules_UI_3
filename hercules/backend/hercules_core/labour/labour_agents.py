"""
Hercules Labour Agents — Email Automation, PDF Summarizer & Clipboard Manager
"""

import os
import re
import time
try:
    from clipboard_manager import ClipboardManager
except ImportError:
    class ClipboardManager:
        def __init__(self):
            self._history: List[Dict[str, Any]] = []
            self._snippets: Dict[str, str] = {}

        def get_history(self, limit: int = 5) -> List[Dict[str, Any]]:
            return self._history[-limit:]

        def save_snippet(self, name: str, text: str):
            self._snippets[name] = text

        def copy_to_clipboard(self, text: str):
            self._history.append({"text": text, "timestamp": time.time()})

class EmailAutomationAgent:
    """Drafts, formats, and prepares executive and technical emails."""

    def __init__(self):
        self.name = "Email Automation"
        self.category = "Labour Agents"

    def compose_email(self, recipient: str, subject: str, purpose: str, key_points: List[str] = None) -> Dict[str, Any]:
        points_text = "\n".join(f"- {p}" for p in (key_points or [purpose]))
        body = f"""Hi {recipient or 'Team'},

I am writing regarding {purpose}.

Key Details:
{points_text}

Please let me know if you have any questions or require additional details.

Best regards,
F.R.I.D.A.Y & Hercules AI"""
        return {
            "agent": self.name,
            "category": self.category,
            "recipient": recipient,
            "subject": subject or f"Update regarding {purpose[:30]}",
            "body": body.strip()
        }

class PDFSummarizerAgent:
    """Extracts text from PDF/Text files and condenses into executive summaries."""

    def __init__(self):
        self.name = "PDF Summarizer"
        self.category = "Labour Agents"

    def summarize_file(self, file_path: str) -> Dict[str, Any]:
        if not os.path.exists(file_path):
            return {"agent": self.name, "category": self.category, "ok": False, "error": f"File not found: {file_path}"}

        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            words = len(content.split())
            sentences = [s.strip() for s in content.split(". ") if len(s.strip()) > 20]
            summary_points = sentences[:5]

            return {
                "agent": self.name,
                "category": self.category,
                "ok": True,
                "file_name": os.path.basename(file_path),
                "total_words": words,
                "summary": summary_points,
                "executive_summary": "\n".join(f"• {p}" for p in summary_points)
            }
        except Exception as e:
            return {"agent": self.name, "category": self.category, "ok": False, "error": str(e)}

class ClipboardManagerAgent:
    """Manages clipboard history, snippets, and intelligent copy-paste workflows."""

    def __init__(self):
        self.name = "Clipboard Manager"
        self.category = "Labour Agents"
        self._clip = ClipboardManager()

    def get_history(self, limit: int = 5) -> List[Dict[str, Any]]:
        return self._clip.get_history(limit)

    def save_snippet(self, name: str, text: str):
        self._clip.save_snippet(name, text)
        return {"agent": self.name, "saved_snippet": name}

    def copy_to_clipboard(self, text: str):
        self._clip.copy_to_clipboard(text)
        return {"agent": self.name, "copied": True, "preview": text[:60]}

email_automation_agent = EmailAutomationAgent()
pdf_summarizer_agent = PDFSummarizerAgent()
clipboard_manager_agent = ClipboardManagerAgent()
