import React from 'react';
import ReactDOM from 'react-dom/client';
import "normalize.css";
import './Styles/main.scss';
import { BrowserRouter, type FutureConfig } from 'react-router-dom';
import { setupAxiosInterceptor } from './utils/axiosInterceptor';
import App from './App';

// Настраиваем глобальный interceptor для axios (для старых API файлов)
setupAxiosInterceptor();

const root = ReactDOM.createRoot(document.getElementById('root')!);
const future: FutureConfig = { v7_startTransition: true, v7_relativeSplatPath: true };

root.render(
  <BrowserRouter basename="/sdd" future={future}>
    <App />
  </BrowserRouter>
);
