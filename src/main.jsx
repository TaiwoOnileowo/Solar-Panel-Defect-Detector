import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateContext } from './Context/StateContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContext>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StateContext>
  </React.StrictMode>
)
