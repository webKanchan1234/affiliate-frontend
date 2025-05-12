// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  type = 'website', 
  url, 
  image, 
  product, 
  brand, 
  category,
  filteredProducts
}) => {
  // Generate default values if not provided
  const pageTitle = title || 
    (product ? `${product.name} | Your Store` : 
     brand ? `${brand} Products | Your Store` : 
     category ? `${category} | Your Store` : 
     'Your Store | Shop Online');
  
  const pageDescription = description || 
    (product ? product.description.substring(0, 160) : 
     brand ? `Shop ${brand} products at best prices with free shipping` : 
     category ? `Explore ${category} products at competitive prices` : 
     'Shop online for the best products at competitive prices');
  
  const pageKeywords = keywords || 
    (product ? `${product.name}, ${product.brand}, buy ${product.name}` : 
     brand ? `${brand}, ${brand} mobiles, buy ${brand} online` : 
     category ? `${category}, buy ${category} online` : 
     'online shopping, ecommerce');
  
  const pageUrl = url || 
    (product ? `/products/${product.urlName}` : 
     brand ? `/brand/${brand.toLowerCase().replace(/\s+/g, '-')}` : 
     category ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` : 
     '/');
  
  const pageImage = image || 
    (product && product.imageUrls?.[0] ? product.imageUrls[0] : 
     '/default-image.jpg');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Structured Data */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": product.rating ? {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewsCount || 0
            } : undefined
          })}
        </script>
      )}
      
      {(brand || category) && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": brand ? `${brand} Products` : `${category} Products`,
            "description": pageDescription,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": filteredProducts?.slice(0, 5).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "url": `/products/${product.urlName}`,
                  "image": product.imageUrls?.[0],
                  "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "INR"
                  }
                }
              }))
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'product']),
  url: PropTypes.string,
  image: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    urlName: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    brand: PropTypes.string,
    rating: PropTypes.number,
    reviewsCount: PropTypes.number
  }),
  brand: PropTypes.string,
  category: PropTypes.string,
  filteredProducts: PropTypes.array
};

export default React.memo(SEO);