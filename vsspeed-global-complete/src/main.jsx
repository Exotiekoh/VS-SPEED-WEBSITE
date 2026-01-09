import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/main.css'

import { VehicleProvider } from './contexts/VehicleContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/VS-SPEED-WEBSITE">
      <VehicleProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </VehicleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
