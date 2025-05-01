// src/App.tsx
import React from 'react'
import styles from './Styles/App.module.scss'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <ToastContainer />
        <AppRouter />
      </div>
    </AuthProvider>
  )
}

export default App
