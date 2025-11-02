import React, { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiHome, FiAlertCircle } from 'react-icons/fi';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логирование ошибки
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Вызов пользовательского обработчика
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.icon}>
                <FiAlertCircle />
              </div>
              <h1 className={styles.title}>Что-то пошло не так</h1>
              <p className={styles.message}>
                Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
              </p>
              {this.state.error && process.env.NODE_ENV === 'development' && (
                <details className={styles.errorDetails}>
                  <summary>Детали ошибки (только для разработки)</summary>
                  <pre>{this.state.error.toString()}</pre>
                </details>
              )}
              
              <div className={styles.actions}>
                <button onClick={this.handleRetry} className={styles.button}>
                  <FiRefreshCw />
                  <span>Попробовать снова</span>
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className={styles.button}
                >
                  <FiRefreshCw />
                  <span>Обновить страницу</span>
                </button>
                <Link to="/" className={styles.buttonPrimary}>
                  <FiHome />
                  <span>На главную</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

