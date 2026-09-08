"""File Service - manages file system operations"""
from typing import AsyncIterator
from datetime import datetime
import uuid
import os
from pathlib import Path
from app.models import (
    FileNode, FilePreview, FileSearchHit, FileAuditEntry
)

class FileService:
    def __init__(self):
        self._storage_root = Path("./storage").resolve()
        self._storage_root.mkdir(exist_ok=True)
        self._audit = []
        self._trash = {}

    async def tree(self, root="/"):
        root_path = self._storage_root / root.lstrip("/")
        if not root_path.exists():
            return []
        return self._build_tree(root_path)

    def _build_tree(self, path, max_depth=3, current_depth=0):
        if current_depth >= max_depth:
            return []
        nodes = []
        try:
            for item in sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):
                stat = item.stat()
                node = FileNode(
                    path=str(item.relative_to(self._storage_root)),
                    name=item.name,
                    kind="folder" if item.is_dir() else "file",
                    sizeBytes=stat.st_size if item.is_file() else None,
                    mime=None,
                    modifiedAt=datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    createdAt=datetime.fromtimestamp(stat.st_ctime).isoformat(),
                    children=self._build_tree(item, max_depth, current_depth + 1) if item.is_dir() else []
                )
                nodes.append(node)
        except PermissionError:
            pass
        return nodes

    async def list(self, dirPath):
        path = self._storage_root / dirPath.lstrip("/")
        if not path.exists() or not path.is_dir():
            return []
        nodes = []
        for item in sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):
            stat = item.stat()
            nodes.append(FileNode(
                path=str(item.relative_to(self._storage_root)),
                name=item.name,
                kind="folder" if item.is_dir() else "file",
                sizeBytes=stat.st_size if item.is_file() else None,
                mime=None,
                modifiedAt=datetime.fromtimestamp(stat.st_mtime).isoformat(),
                createdAt=datetime.fromtimestamp(stat.st_ctime).isoformat(),
                children=[]
            ))
        return nodes

    async def read(self, path):
        file_path = self._storage_root / path.lstrip("/")
        if not file_path.exists() or not file_path.is_file():
            return None
        stat = file_path.stat()
        content = None
        lines = None
        truncated = False
        try:
            text = file_path.read_text(encoding="utf-8", errors="ignore")
            content = text[:10000]
            lines = len(text.splitlines())
            truncated = len(text) > 10000
        except Exception:
            pass
        return FilePreview(
            path=str(file_path.relative_to(self._storage_root)),
            name=file_path.name,
            kind="file",
            sizeBytes=stat.st_size,
            mime="text/plain",
            content=content,
            lines=lines,
            truncated=truncated
        )

    async def search(self, query):
        results = []
        for file_path in self._storage_root.rglob("*"):
            if file_path.is_file():
                try:
                    text = file_path.read_text(encoding="utf-8", errors="ignore")
                    if query.lower() in text.lower():
                        matched = [line for line in text.splitlines() if query.lower() in line.lower()][:5]
                        results.append(FileSearchHit(
                            path=str(file_path.relative_to(self._storage_root)),
                            name=file_path.name,
                            kind="file",
                            matchedLines=matched,
                            score=0.8
                        ))
                except Exception:
                    pass
        return results[:50]

    async def createFolder(self, parentPath, name):
        path = self._storage_root / parentPath.lstrip("/") / name
        path.mkdir(parents=True, exist_ok=True)
        stat = path.stat()
        return FileNode(
            path=str(path.relative_to(self._storage_root)),
            name=name,
            kind="folder",
            sizeBytes=None,
            mime=None,
            modifiedAt=datetime.fromtimestamp(stat.st_mtime).isoformat(),
            createdAt=datetime.fromtimestamp(stat.st_ctime).isoformat(),
            children=[]
        )

    async def upload(self, parentPath, files):
        nodes = []
        for f in files:
            node = FileNode(
                path=f"{parentPath.lstrip('/')}/{f['name']}",
                name=f['name'],
                kind="file",
                sizeBytes=f.get('sizeBytes', 0),
                mime="application/octet-stream",
                modifiedAt=datetime.utcnow().isoformat(),
                createdAt=datetime.utcnow().isoformat(),
                children=[]
            )
            nodes.append(node)
        return nodes

    async def watch(self, path, on):
        pass

    async def index(self, path, on):
        pass

    async def reveal(self, path):
        pass

    async def trash(self, path):
        file_path = self._storage_root / path.lstrip("/")
        if file_path.exists():
            self._trash[path] = {"path": path, "name": file_path.name, "at": datetime.utcnow().isoformat()}

    async def restore(self, path):
        if path in self._trash:
            del self._trash[path]

    async def write(self, path, content):
        file_path = self._storage_root / path.lstrip("/")
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_text(content, encoding="utf-8")
        stat = file_path.stat()
        return FileNode(
            path=str(file_path.relative_to(self._storage_root)),
            name=file_path.name,
            kind="file",
            sizeBytes=stat.st_size,
            mime="text/plain",
            modifiedAt=datetime.fromtimestamp(stat.st_mtime).isoformat(),
            createdAt=datetime.fromtimestamp(stat.st_ctime).isoformat(),
            children=[]
        )

    async def trashList(self):
        return list(self._trash.values())

    async def audit(self):
        return self._audit

file_service = FileService()