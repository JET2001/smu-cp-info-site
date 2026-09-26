import { createRootRoute, Outlet } from '@tanstack/react-router';
import { PageHeading } from '../components/PageHeading';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

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

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Competitive Programming at Singapore Management University',
      },
      {
        title: 'SMU Competitive Programming',
      },
    ],
  }),
});
