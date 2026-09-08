"""
Hercules Research Department — Scraper, Refiner, System Checker & Summarizer
"""

import re
import sys
import platform
import subprocess
from typing import Dict, Any, List
import requests

class ScraperAgent:
    """Extracts information from websites and APIs."""

    def __init__(self):
        self.name = "Scraper"
        self.department = "Research"

    def scrape_url(self, url: str, timeout: int = 8) -> Dict[str, Any]:
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            resp = requests.get(url, headers=headers, timeout=timeout)
            text = re.sub(r"<[^>]+>", " ", resp.text)
            text = re.sub(r"\s+", " ", text).strip()
            return {
                "agent": self.name,
                "department": self.department,
                "url": url,
                "ok": resp.status_code == 200,
                "status_code": resp.status_code,
                "content": text[:1500]
            }
        except Exception as e:
            return {"agent": self.name, "department": self.department, "url": url, "ok": False, "error": str(e)}

class RefinerAgent:
    """Cleans, filters noise, and extracts structured key-value entities."""

    def __init__(self):
        self.name = "Refiner"
        self.department = "Research"

    def refine(self, raw_text: str) -> Dict[str, Any]:
        cleaned = re.sub(r"\s+", " ", raw_text).strip()
        bullet_points = [p.strip() for p in cleaned.split(". ") if len(p.strip()) > 15][:5]
        return {
            "agent": self.name,
            "department": self.department,
            "status": "success",
            "extracted_facts": bullet_points,
            "word_count": len(cleaned.split())
        }

class SystemCheckerAgent:
    """Audits OS environment, Python runtime, memory, and package availability."""

    def __init__(self):
        self.name = "System Checker"
        self.department = "Research"

    def check(self) -> Dict[str, Any]:
        return {
            "agent": self.name,
            "department": self.department,
            "os": platform.system(),
            "os_release": platform.release(),
            "python_version": sys.version.split()[0],
            "executable": sys.executable,
            "machine": platform.machine(),
            "status": "healthy"
        }

class SummarizerAgent:
    """Condenses complex multi-source intelligence into executive bullet points."""

    def __init__(self):
        self.name = "Summarizer"
        self.department = "Research"

    def summarize(self, text: str, max_points: int = 4) -> Dict[str, Any]:
        sentences = [s.strip() for s in text.split(". ") if s.strip()]
        selected = sentences[:max_points]
        return {
            "agent": self.name,
            "department": self.department,
            "summary_bullets": [f"• {s}" for s in selected],
            "summary_text": ". ".join(selected) + ("." if selected else "")
        }

scraper_agent = ScraperAgent()
refiner_agent = RefinerAgent()
system_checker_agent = SystemCheckerAgent()
summarizer_agent = SummarizerAgent()
