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
  const ogImage = image || 'https://cudoteka.pl/images/og-default.webp';
  const meta = [
    { name: 'description', content: description },
    { property: 'og:site_name', content: siteTitle },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:secure_url', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Cudoteka - twórcze warsztaty i animacje dla dzieci' },
    { property: 'og:locale', content: 'pl_PL' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    // TODO(FOUNDER): set twitter:site once you have a Twitter/X handle
    // { name: 'twitter:site', content: '@cudoteka' },
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
  // TODO(FOUNDER): fill in streetAddress, postalCode, geo coordinates,
  // openingHoursSpecification, and sameAs (social URLs). See
  // docs/dane-dla-zalozycielki.md section 1 for the request format.
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cudoteka.pl/#business',
    name: 'Cudoteka',
    alternateName: 'E-CUD',
    description: 'Twórcze warsztaty, sensoplastyka, animacje i eventy dla dzieci i dorosłych. Warszawa i okolice.',
    url: 'https://cudoteka.pl',
    telephone: '+48-607-370-777',
    email: 'biuro@e-cud.waw.pl',
    areaServed: [
      { '@type': 'City', name: 'Warszawa' },
      { '@type': 'AdministrativeArea', name: 'Mazowieckie' },
    ],
    priceRange: '$$',
    image: 'https://cudoteka.pl/images/og-default.webp',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cudoteka.pl/favicon.svg',
    },
    address: {
      '@type': 'PostalAddress',
      // streetAddress: 'ul. ___________', // TODO(FOUNDER)
      addressLocality: 'Warszawa',
      addressRegion: 'mazowieckie',
      // postalCode: '00-000', // TODO(FOUNDER)
      addressCountry: 'PL',
    },
    // geo: { // TODO(FOUNDER) — uncomment and provide lat/lng
    //   '@type': 'GeoCoordinates',
    //   latitude: 52.2297,
    //   longitude: 21.0122,
    // },
    // openingHoursSpecification: [{ // TODO(FOUNDER) — uncomment and configure
    //   '@type': 'OpeningHoursSpecification',
    //   dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    //   opens: '09:00',
    //   closes: '18:00',
    // }],
    // sameAs: [ // TODO(FOUNDER) — uncomment and add social URLs
    //   'https://www.facebook.com/cudoteka',
    //   'https://www.instagram.com/cudoteka',
    // ],
    founder: {
      '@type': 'Person',
      name: 'Aleksandra Dąbrowska',
      jobTitle: 'Założycielka, pedagog twórcza',
    },
    knowsAbout: [
      'Sensoplastyka',
      'Plastyka ekspresywna',
      'Edukacja alternatywna',
      'Animacje eventowe dla dzieci',
      'Eko-projekty edukacyjne',
      'Ceramika artystyczna',
      'Pedagogika twórcza',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Warsztaty i animacje Cudoteka',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Warsztaty dla dzieci',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sensoplastyka' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ceramika' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eko-kosmetyki' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warsztaty plastyczne' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Animacje eventowe',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Animacje urodzinowe' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Animacje na eventy firmowe' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pokazy baniek mydlanych' } },
          ],
        },
      ],
    },
  };
}
