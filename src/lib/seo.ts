interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: string;
}

export function seo({ title, description, image, canonical, type = 'website' }: SeoProps) {
  const siteTitle = 'Cudoteka';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const ogImage = image || 'https://cudoteka.pl/images/og-default.png';
  const meta = [
    { name: 'description', content: description },
    { property: 'og:site_name', content: siteTitle },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:image', content: ogImage },
    { property: 'og:locale', content: 'pl_PL' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];
  if (canonical) {
    meta.push({ property: 'og:url', content: canonical });
  }
  return {
    title: fullTitle,
    meta,
    canonical,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cudoteka.pl/#business',
    name: 'Cudoteka',
    alternateName: 'E-CUD',
    description: 'Twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych.',
    url: 'https://cudoteka.pl',
    telephone: '+48-607-370-777',
    email: 'biuro@e-cud.waw.pl',
    areaServed: 'Warszawa i okolice',
    priceRange: '$$',
    image: 'https://cudoteka.pl/images/og-default.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressCountry: 'PL',
    },
  };
}
