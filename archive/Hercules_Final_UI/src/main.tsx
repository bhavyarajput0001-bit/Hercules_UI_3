/**
 * HERCULES · entry point
 * Order matters: theme before first paint, then mount, then boot the core.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { initTheme } from './theme/bridge';
import './styles/global.css';
import './styles/screens.css';

// Global error handler
window.addEventListener('error', (e) => {
  console.error('[HERCULES] Global error:', e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[HERCULES] Unhandled rejection:', e.reason);
});

const container = document.getElementById('root');
if (!container) {
  console.error('HERCULES: #root missing');
  document.body.innerHTML = '<div style="color:#ff5f6d;padding:2rem;font-family:monospace">HERCULES: #root element not found</div>';
  throw new Error('HERCULES: #root missing');
}

console.log('[HERCULES] Mounting app...');

try {
  void initTheme();
  console.log('[HERCULES] Theme initialized');

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('[HERCULES] App mounted');
} catch (err) {
  console.error('[HERCULES] Mount failed:', err);
  container.innerHTML = `<div style="color:#ff5f6d;padding:2rem;font-family:monospace">HERCULES mount failed: ${err instanceof Error ? err.message : String(err)}</div>`;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // Nothing to tear down: mock services are module singletons by design.
  });
}
