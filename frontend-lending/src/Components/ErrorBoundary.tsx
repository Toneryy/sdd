import React, { Component, type ReactNode } from 'react'

interface Props { 
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State { 
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логирование ошибки
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Вызов пользовательского обработчика
    this.props.onError?.(error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          style={{ 
            padding: 24, 
            textAlign: 'center',
            border: '1px solid #ff6b6b',
            borderRadius: 8,
            backgroundColor: '#fff5f5',
            margin: 16
          }} 
          role="alert"
        >
          <h3 style={{ color: '#d63031', margin: '0 0 16px 0' }}>
            Что-то пошло не так
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#666' }}>
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </p>
          <button 
            onClick={this.handleRetry}
            style={{
              padding: '8px 16px',
              backgroundColor: '#74b9ff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              marginRight: 8
            }}
          >
            Попробовать снова
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#00b894',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Обновить страницу
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
export {}


