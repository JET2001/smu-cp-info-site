import { SITE_NAME, SITE_URL } from './constants';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMeta({ title, description, path }: PageMetaInput) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:url', content: url },
      { property: 'og:description', content: description },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}
