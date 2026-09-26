import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import './globals.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('app not found')
}

createRoot(app).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
