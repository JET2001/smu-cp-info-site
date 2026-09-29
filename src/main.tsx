import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createAppRouter } from './router';

import './globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('app not found');
}

const queryClient = new QueryClient();
const router = createAppRouter(queryClient);

createRoot(app).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
