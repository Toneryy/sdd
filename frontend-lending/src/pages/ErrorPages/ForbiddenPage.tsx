import React from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorPage from './ErrorPage';

const ForbiddenPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>403 - Доступ запрещен</title>
        <meta name="description" content="У вас нет прав для доступа к этой странице" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ErrorPage
        code={403}
        title="Доступ запрещен"
        message="У вас нет прав для доступа к этой странице"
        description="Для доступа к этому разделу необходима авторизация или дополнительные права. Войдите в систему или обратитесь к администратору."
      />
    </>
  );
};

export default ForbiddenPage;

