import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import './index.css'
import App from './App.tsx'
import { asset } from './asset'

document.documentElement.style.setProperty('--broccoli-mask', `url("${asset('/assets/broccoli-mask.svg')}")`)
document.documentElement.style.setProperty('--broccoli-mask-2', `url("${asset('/assets/broccoli-mask-2.svg')}")`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
