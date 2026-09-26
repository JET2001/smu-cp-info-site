import { type QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { PageHeading } from '../components/PageHeading';
import { PageTransition } from '../components/PageTransition';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { SITE_NAME, SITE_URL } from '../constants';

const siteDescription =
  'Competitive programming at Singapore Management University - a student community for algorithms, mathematics and problem solving, with a pathway to ICPC.';

// index.html ships fallback SEO tags for crawlers that do not run JS.
// Once the router has rendered its own head tags, drop the fallbacks so
// crawlers that do render JS never see duplicate (and conflicting) tags.
function useSeoFallbackCleanup() {
  useEffect(() => {
    document
      .querySelectorAll('head > [data-seo-fallback]')
      .forEach((element) => element.remove());
  }, []);
}

export type RouterAppContext = {
  queryClient: QueryClient;
};

function RootLayout() {
  useSeoFallbackCleanup();

  return (
    <>
      <HeadContent />
      <SiteHeader />
      <PageTransition />
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

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      {
        title: `${SITE_NAME} | Singapore Management University`,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_SG' },
      { property: 'og:title', content: SITE_NAME },
      { property: 'og:description', content: siteDescription },
      { property: 'og:url', content: `${SITE_URL}/` },
      { property: 'og:image', content: `${SITE_URL}/favicon.png` },
      { name: 'twitter:card', content: 'summary' },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/favicon.png`,
        },
      },
    ],
  }),
});
