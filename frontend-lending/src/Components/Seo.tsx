import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title?: string;
  description?: string;
}

const Seo: React.FC<Props> = ({ title, description }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default Seo;
export {};

 