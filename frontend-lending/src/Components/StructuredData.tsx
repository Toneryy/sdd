import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ProductStructuredData {
  name: string;
  description?: string;
  image?: string;
  price: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url?: string;
  category?: string;
}

interface ServiceStructuredData {
  name: string;
  description?: string;
  image?: string;
  price: number;
  priceCurrency?: string;
  url?: string;
}

interface Props {
  type: 'product' | 'service';
  data: ProductStructuredData | ServiceStructuredData;
}

const StructuredData: React.FC<Props> = ({ type, data }) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  if (type === 'product') {
    const productData = data as ProductStructuredData;
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productData.name,
      description: productData.description || productData.name,
      image: productData.image ? (productData.image.startsWith('http') ? productData.image : `${baseUrl}${productData.image}`) : undefined,
      offers: {
        '@type': 'Offer',
        price: productData.price,
        priceCurrency: productData.priceCurrency || 'RUB',
        availability: `https://schema.org/${productData.availability || 'InStock'}`,
        url: productData.url || (typeof window !== 'undefined' ? window.location.href : ''),
      },
      category: productData.category,
    };

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  if (type === 'service') {
    const serviceData = data as ServiceStructuredData;
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Service',
      name: serviceData.name,
      description: serviceData.description || serviceData.name,
      image: serviceData.image ? (serviceData.image.startsWith('http') ? serviceData.image : `${baseUrl}${serviceData.image}`) : undefined,
      offers: {
        '@type': 'Offer',
        price: serviceData.price,
        priceCurrency: serviceData.priceCurrency || 'RUB',
        url: serviceData.url || (typeof window !== 'undefined' ? window.location.href : ''),
      },
    };

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  }

  return null;
};

export default StructuredData;

