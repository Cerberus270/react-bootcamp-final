import React from 'react'
import { Outlet } from 'react-router-dom'
import ColorModeButton from '../components/ColorModeButton'

const MainLayout = () => {
  return (
    <div>
      <ColorModeButton justifySelf={"flex-end"} />
      <Outlet />
    </div>
  )
}

export default MainLayout