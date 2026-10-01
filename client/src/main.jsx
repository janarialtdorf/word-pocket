import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import { ensureGuestSession } from './lib/supabase.js';


const root = createRoot(document.getElementById('root'));

async function bootstrap() {
  await ensureGuestSession();
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

bootstrap().catch((error) => {
  console.error(error);

  root.render(
    <p>Couldnt start a guest session. Please refresh, pray and try again</p>
  );
});
