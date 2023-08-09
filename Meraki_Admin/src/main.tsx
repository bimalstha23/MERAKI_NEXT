import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import QueryProvider from './Providers/QueryProvider.tsx'
import { AuthProvider } from './Providers/AuthProvider.tsx'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode >,
)
