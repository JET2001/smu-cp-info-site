import { type QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createAppRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    trailingSlash: 'always',
    defaultPreload: 'viewport',
    context: { queryClient },
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
