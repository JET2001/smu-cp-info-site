import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { PageHeading } from './components/PageHeading';
import { HomePage } from './routes/HomePage';
import { MembersPage } from './routes/MembersPage';
import { TrainingsPage } from './routes/TrainingsPage';
import { loadMembers } from './members/logic';

function RootLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}

function NotFoundPage() {
  return (
    <main className="page-container">
      <PageHeading
        title="Not Found"
        description="The page you are looking for does not exist."
      />
    </main>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const trainingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trainings',
  component: TrainingsPage,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/members',
  component: MembersPage,
  loader: () => loadMembers(),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  trainingsRoute,
  membersRoute,
]);

export const router = createRouter({
  routeTree,
  trailingSlash: 'always',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
