#!/usr/bin/env python3
"""
Hercules AI OS - Unified Launcher
Single entry point that starts all services and opens the UI
Like OmniRoute's desktop app - one click, everything runs
"""

import os
import sys
import subprocess
import time
import signal
import atexit
import threading
import webbrowser
from pathlib import Path
from typing import List, Optional

class HerculesLauncher:
    def __init__(self):
        self.project_root = Path(__file__).parent.absolute()
        self.processes: List[subprocess.Popen] = []
        self.running = False
        
    def check_dependencies(self) -> bool:
        """Check if required tools are installed"""
        checks = {
            "docker": "docker --version",
            "docker-compose": "docker-compose --version",  # Use standalone binary
            "node": "node --version",
            "python3": "python3 --version",
            "bun": "bun --version",
        }
        
        missing = []
        for name, cmd in checks.items():
            try:
                subprocess.run(cmd.split(), capture_output=True, check=True)
                print(f"  ✅ {name}")
            except (subprocess.CalledProcessError, FileNotFoundError):
                print(f"  ❌ {name} - MISSING")
                missing.append(name)
        
        if missing:
            print(f"\n⚠️  Missing dependencies: {', '.join(missing)}")
            print("Install them first, then re-run launcher.")
            return False
        return True
    
    def setup_env(self) -> bool:
        """Ensure .env.local exists with required keys"""
        env_template = self.project_root / ".env.template"
        env_local = self.project_root / ".env.local"
        
        if not env_local.exists():
            if env_template.exists():
                print("📝 Creating .env.local from template...")
                env_local.write_text(env_template.read_text())
                print("⚠️  EDIT .env.local with your API keys before continuing!")
                return False
            else:
                print("❌ No .env.template found")
                return False
        
        # Check if keys are still placeholder
        content = env_local.read_text()
        if "your-" in content or "changeme" in content or "dev-key" in content:
            print("⚠️  .env.local has placeholder keys - please edit with real API keys")
            return False
        
        print("  ✅ .env.local configured")
        return True
    
    def start_docker_services(self) -> bool:
        """Start Docker Compose services"""
        print("\n🐳 Starting Docker services...")
        compose_file = self.project_root / "docker-compose.yml"
        
        if not compose_file.exists():
            print("  ❌ docker-compose.yml not found")
            return False
        
        try:
            # Start in background
            proc = subprocess.Popen(
                ["docker", "compose", "--env-file", ".env.local", "up", "-d"],
                cwd=self.project_root,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            self.processes.append(proc)
            
            # Wait for startup
            stdout, stderr = proc.communicate(timeout=60)
            if proc.returncode != 0:
                print(f"  ❌ Docker compose failed: {stderr.decode()}")
                return False
            
            print("  ✅ Docker services started")
            return True
        except subprocess.TimeoutExpired:
            print("  ❌ Docker startup timed out")
            return False
        except Exception as e:
            print(f"  ❌ Docker error: {e}")
            return False
    
    def wait_for_services(self) -> bool:
        """Wait for all services to be healthy"""
        print("\n⏳ Waiting for services to be ready...")
        
        services = [
            ("OmniRoute", "http://localhost:20128/health"),
            ("Hercules Core", "http://localhost:8420/health"),
            ("freellmapi", "http://localhost:3001/api/ping"),
        ]
        
        import urllib.request
        import json
        
        for name, url in services:
            print(f"  Waiting for {name}...")
            for _ in range(30):
                try:
                    req = urllib.request.Request(url)
                    req.add_header('Authorization', 'Bearer freellmapi-bb5f9b2007727fc4c623db803d5d003f2f98fc55c4eb69cb')
                    response = urllib.request.urlopen(req, timeout=2)
                    if response.status == 200:
                        print(f"  ✅ {name} ready")
                        break
                except:
                    time.sleep(2)
            else:
                print(f"  ⚠️  {name} not responding (may need API keys)")
        
        return True
    
    def start_hercules_core(self) -> bool:
        """Start Hercules Core backend"""
        print("\n🚀 Starting Hercules Core...")
        core_dir = self.project_root / "hercules-core"
        
        if not core_dir.exists():
            print("  ❌ hercules-core directory not found")
            return False
        
        try:
            proc = subprocess.Popen(
                [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8420", "--reload"],
                cwd=core_dir,
                env={**os.environ, "PYTHONPATH": str(core_dir)},
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            self.processes.append(proc)
            print("  ✅ Hercules Core starting on port 8420")
            return True
        except Exception as e:
            print(f"  ❌ Failed to start Hercules Core: {e}")
            return False
    
    def start_hercules_frontend(self) -> bool:
        """Start Hercules Frontend"""
        print("\n🎨 Starting Hercules Frontend...")
        frontend_dir = self.project_root / "Hercules" / "hercules"
        
        if not frontend_dir.exists():
            print("  ❌ Frontend directory not found")
            return False
        
        try:
            proc = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=frontend_dir,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            self.processes.append(proc)
            print("  ✅ Frontend starting on port 5173")
            return True
        except Exception as e:
            print(f"  ❌ Failed to start frontend: {e}")
            return False
    
    def start_freellmapi(self) -> bool:
        """Start freellmapi"""
        print("\n🔑 Starting freellmapi...")
        freellm_dir = self.project_root / "external-repos" / "freellmapi"
        
        if not freellm_dir.exists():
            print("  ❌ freellmapi directory not found")
            return False
        
        try:
            encryption_key = os.urandom(32).hex()
            env = {
                **os.environ,
                "PORT": "3001",
                "HOST": "0.0.0.0",
                "NODE_ENV": "production",
                "ENCRYPTION_KEY": encryption_key,
                "HOST_BIND": "0.0.0.0",
                "DASHBOARD_ORIGINS": "http://localhost:5173,http://localhost:3000,http://localhost:8420"
            }
            proc = subprocess.Popen(
                ["node", "server/dist/index.js"],
                cwd=freellm_dir,
                env=env,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            self.processes.append(proc)
            print("  ✅ freellmapi starting on port 3001")
            return True
        except Exception as e:
            print(f"  ❌ Failed to start freellmapi: {e}")
            return False
    
    def open_browser_tabs(self):
        """Open all service URLs in browser"""
        print("\n🌐 Opening browser tabs...")
        urls = [
            ("Hercules Command Center", "http://localhost:5173"),
            ("Hercules API Docs", "http://localhost:8420/docs"),
            ("OmniRoute Dashboard", "http://localhost:20128"),
            ("freellmapi Dashboard", "http://localhost:3001"),
        ]
        
        for name, url in urls:
            print(f"  🌐 Opening {name}: {url}")
            webbrowser.open_new_tab(url)
            time.sleep(0.5)
    
    def signal_handler(self, signum, frame):
        """Handle shutdown signals"""
        print("\n\n🛑 Shutting down Hercules AI OS...")
        self.cleanup()
        sys.exit(0)
    
    def cleanup(self):
        """Clean up all processes"""
        print("🧹 Cleaning up processes...")
        for proc in self.processes:
            try:
                proc.terminate()
                proc.wait(timeout=5)
            except:
                try:
                    proc.kill()
                except:
                    pass
        # Also stop docker compose
        try:
            subprocess.run(
                ["docker", "compose", "down"],
                cwd=self.project_root,
                capture_output=True,
                timeout=30
            )
        except:
            pass
    
    def run(self):
        """Main launcher entry point"""
        print("""
╔══════════════════════════════════════════════════════════════╗
║                  🏛️  HERCULES AI OS LAUNCHER                   ║
║              One Click • All Services • Ready to Go            ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        # Setup signal handlers
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
        atexit.register(self.cleanup)
        
        # Step 1: Check dependencies
        print("🔍 Checking dependencies...")
        if not self.check_dependencies():
            return False
        
        # Step 2: Setup environment
        print("\n📋 Checking configuration...")
        if not self.setup_env():
            print("\n📝 Please edit .env.local with your API keys, then re-run.")
            return False
        
        # Step 3: Start Docker services
        if not self.start_docker_services():
            return False
        
        # Step 4: Start local services
        if not self.start_freellmapi():
            return False
        time.sleep(3)
        
        if not self.start_hercules_core():
            return False
        time.sleep(3)
        
        if not self.start_hercules_frontend():
            return False
        
        # Step 5: Wait for services
        if not self.wait_for_services():
            print("⚠️  Some services may not be fully ready")
        
        # Step 6: Open browser
        self.open_browser_tabs()
        
        # Success!
        print("""
╔══════════════════════════════════════════════════════════════╗
║                    ✅ HERCULES AI OS READY                     ║
╠══════════════════════════════════════════════════════════════╣
║  🎮 Hercules Command Center:  http://localhost:5173           ║
║  📚 API Documentation:         http://localhost:8420/docs     ║
║  🔀 OmniRoute Gateway:         http://localhost:20128         ║
║  🔑 freellmapi Dashboard:      http://localhost:3001          ║
╠══════════════════════════════════════════════════════════════╣
║  Press Ctrl+C to shut down all services                       ║
╚══════════════════════════════════════════════════════════════╝
        """)
        
        self.running = True
        
        # Keep running until interrupted
        try:
            while self.running:
                time.sleep(1)
        except KeyboardInterrupt:
            pass
        finally:
            self.cleanup()
        
        return True


def main():
    launcher = HerculesLauncher()
    success = launcher.run()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()