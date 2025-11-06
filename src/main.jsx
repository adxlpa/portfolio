// src/<entry-file>.jsx  (main.jsx or index.jsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'   // ✅ required
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
