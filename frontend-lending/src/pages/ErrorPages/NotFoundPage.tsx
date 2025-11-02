import React from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorPage from './ErrorPage';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Страница не найдена</title>
        <meta name="description" content="Запрашиваемая страница не существует" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ErrorPage
        code={404}
        title="Страница не найдена"
        message="К сожалению, запрашиваемая страница не существует"
        description="Возможно, вы перешли по неверной ссылке или страница была удалена. Проверьте адрес или вернитесь на главную страницу."
      />
    </>
  );
};

export default NotFoundPage;

