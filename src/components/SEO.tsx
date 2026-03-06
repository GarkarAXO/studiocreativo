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
  const lang = i18n.language === 'es' ? 'es-MX' : 'en-US';
  
  // Esquema de Datos Estructurados para Google
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "ProfessionalService",
    "name": "Studio Creativo",
    "image": "https://studiocreativo.digital/logo/logoalt.png",
    "url": "https://studiocreativo.digital",
    "telephone": "+525591877538",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressCountry": "MX"
    },
    "priceRange": "$$$",
    "description": "Agencia de Marketing Digital y Diseño Web Boutique en México.",
    "sameAs": [
      "https://www.facebook.com/share/1NpSLY1fM9/"
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <html lang={i18n.language} />
      <title>{title ? `${title} | ${name}` : name}</title>
      <meta name="description" content={description} />
      <link rel="alternate" hrefLang="es-mx" href="https://studiocreativo.digital/" />
      <link rel="alternate" hrefLang="en-us" href="https://studiocreativo.digital/en" />

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};
