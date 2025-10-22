// src/App.tsx
import React from 'react'
import styles from './Styles/App.module.scss'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './Components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <div className={styles.app}>
            <ToastContainer />
            <AppRouter />
          </div>
        </ErrorBoundary>
      </HelmetProvider>
    </AuthProvider>
  )
}

export default App
