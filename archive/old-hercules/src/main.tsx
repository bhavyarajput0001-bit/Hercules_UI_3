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

const container = document.getElementById('root');
if (!container) throw new Error('HERCULES: #root missing');

void initTheme();

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // Nothing to tear down: mock services are module singletons by design.
  });
}
