import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'

// LocatorJS — brauzerda Option/Alt bosib komponentni bosing, editorda ochiladi.
// Faqat dev build'da yuklanadi, production bundle'ga tushmaydi.
if (import.meta.env.DEV) {
  import('@locator/runtime').then(({ default: setup }) => {
    setup({ adapter: 'jsx' })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
