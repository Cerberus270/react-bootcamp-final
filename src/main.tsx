import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ColorModeScript } from "@chakra-ui/react"
//import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
)
