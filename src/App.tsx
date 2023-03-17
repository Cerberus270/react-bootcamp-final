import { useState } from 'react'
import './App.css'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Box, Text } from "@chakra-ui/react"
import ColorModeButton from './components/ColorModeButton'
import Login from './components/login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize={"xl"}>
        <ColorModeButton justifySelf={"flex-end"} />
        <Login />
      </Box>
    </ChakraProvider>
  )
}

export default App
