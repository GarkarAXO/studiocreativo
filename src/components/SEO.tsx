import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, type = 'website', name = 'Studio Creativo' }) => {
  const { i18n } = useTranslation();
  const location = typeof window !== 'undefined' ? window.location.pathname : '';
  const baseUrl = 'https://studiocreativo.digital';
  const canonicalUrl = `${baseUrl}${location}`;
  
  const defaultDescription = i18n.language === 'es' 
    ? 'Agencia de Marketing Digital y Diseño Web Boutique en México. Elevamos experiencias digitales con estrategia de alto nivel.'
    : 'Boutique Digital Marketing and Web Design Agency in Mexico. Elevating digital experiences with high-level strategy.';

  const seoDescription = description || defaultDescription;

  // Esquema de Datos Estructurados para Google
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": name,
    "image": `${baseUrl}/logo/logoalt.png`,
    "url": baseUrl,
    "telephone": "+525591877538",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressCountry": "MX"
    },
    "priceRange": "$$$",
    "description": defaultDescription,
    "sameAs": [
      "https://www.facebook.com/share/1NpSLY1fM9/"
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <html lang={i18n.language} />
      <title>{title ? `${title} | ${name}` : name}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      <link rel="alternate" hrefLang="es-mx" href={`${baseUrl}/`} />
      <link rel="alternate" hrefLang="en-us" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || name} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}/logo/logoalt.png`} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || name} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${baseUrl}/logo/logoalt.png`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};
