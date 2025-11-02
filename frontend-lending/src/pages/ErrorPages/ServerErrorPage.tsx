import React from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorPage from './ErrorPage';

const ServerErrorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>500 - Ошибка сервера</title>
        <meta name="description" content="Произошла внутренняя ошибка сервера" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ErrorPage
        code={500}
        title="Ошибка сервера"
        message="Произошла внутренняя ошибка сервера"
        description="Наши специалисты уже работают над решением проблемы. Пожалуйста, попробуйте обновить страницу через несколько минут."
      />
    </>
  );
};

export default ServerErrorPage;

