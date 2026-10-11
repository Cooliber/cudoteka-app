interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: string;
}

export function seo({ title, description, image, canonical, type = 'website' }: SeoProps) {
  const siteTitle = 'Cudoteka';
  // Content metaTitles often already carry the "| Cudoteka" suffix — appending
  // it again produced titles like "… | Cudoteka | Cudoteka" on 95/104 pages.
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
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

// BreadcrumbList for static pages. Dynamic routes (blog posts, workshops,
// offer categories) build their own inline — they also need the item names
// from content.
export function breadcrumbs(
  items: { name: string; path: string }[],
  base: URL | string = 'https://cudoteka.pl',
) {
  const origin = typeof base === 'string' ? new URL(base) : base;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, origin).toString(),
    })),
  };
}

// Site-wide Organization entity (logo, contact) that LocalBusiness and
// WebSite reference by @id. sameAs profiles verified 2026-10-11: Google
// Business Profile (CID 1048077975271774269) and the Facebook page.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://cudoteka.pl/#organization',
    name: 'Cudoteka',
    alternateName: 'E-CUD - Centrum Edukacyjno-Eventowe',
    url: 'https://cudoteka.pl',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cudoteka.pl/favicon.svg',
    },
    email: 'biuro@e-cud.waw.pl',
    telephone: '+48607370777',
    sameAs: [
      'https://maps.google.com/?cid=1048077975271774269',
      'https://www.facebook.com/p/Cudoteka-61573778519531/',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+48607370777',
        email: 'biuro@e-cud.waw.pl',
        contactType: 'customer service',
        availableLanguage: ['Polish'],
      },
    ],
    founder: {
      '@type': 'Person',
      '@id': 'https://cudoteka.pl/o-nas/#aleksandra',
      name: 'Aleksandra Dąbrowska',
    },
  };
}

// WebSite entity for the homepage — the name/url pair Google uses for site
// names (developers.google.com/search/docs/appearance/site-names).
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://cudoteka.pl/#website',
    name: 'Cudoteka',
    url: 'https://cudoteka.pl',
    inLanguage: 'pl-PL',
    publisher: { '@id': 'https://cudoteka.pl/#organization' },
  };
}

export function localBusinessSchema() {
  // TODO(FOUNDER): fill in geo coordinates and openingHoursSpecification.
  // See docs/dane-dla-zalozycielki.md section 1 for the request format.
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cudoteka.pl/#business',
    name: 'Cudoteka',
    alternateName: 'E-CUD',
    description: 'Twórcze warsztaty, sensoplastyka, animacje i eventy dla dzieci i dorosłych. Warszawa i okolice.',
    url: 'https://cudoteka.pl',
    hasMap: 'https://maps.google.com/?cid=1048077975271774269',
    sameAs: [
      'https://maps.google.com/?cid=1048077975271774269',
      'https://www.facebook.com/p/Cudoteka-61573778519531/',
    ],
    telephone: '+48607370777',
    email: 'biuro@e-cud.waw.pl',
    parentOrganization: { '@id': 'https://cudoteka.pl/#organization' },
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
      streetAddress: 'Skalbmierska 13',
      addressLocality: 'Warszawa',
      addressRegion: 'mazowieckie',
      postalCode: '01-848',
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
