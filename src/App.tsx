import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Box, Text } from "@chakra-ui/react"
import ColorModeButton from './components/ColorModeButton'
import Login from './components/login/Login'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import DashboardHR from './components/dashboardHR/DashboardHR'

function App() {

  return (
    /*
      Comentarios Importantes en Espanol
    */
    /*
    En este proyecto, estoy utilizando la libreria de componentes 
    Chakra UI que tiene un provider, para lo cual necesito wrappear,
    toda mi app en el provider, y a su ves wrappear Dentro de las,
    rutas de react-router-dom, por lo cual declaro un Layout, donde
    llamare los componentes necesarios para cada caso.
    */
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
          {/* Rutas con Autenticacion */}
          <Route path='/admin' element={<MainLayout />}>
            <Route index element={<DashboardHR />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
