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
  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:image', content: image || '/images/og-default.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image || '/images/og-default.jpg' },
    ],
    canonical,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cudoteka',
    description: 'Twórcze warsztaty, sensoplastyka i animacje dla dzieci i dorosłych.',
    url: 'https://cudoteka.pl',
    telephone: '+48-607-370-777',
    email: 'biuro@e-cud.waw.pl',
    areaServed: 'Warszawa i okolice',
    priceRange: '$$',
    image: 'https://cudoteka.pl/images/og-default.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressCountry: 'PL'
    }
  };
}
