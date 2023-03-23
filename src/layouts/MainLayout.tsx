import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ColorModeButton from '../components/ColorModeButton'
import { auth } from '../database/db'

const MainLayout = () => {
  const [logged, setLogged] = useState<boolean>(true);

  const user = auth.currentUser; // Getting the current user

  const checkUser = () => {

    if (user) {
      setLogged(true);
      console.log("User is logged in!");
    } else {
      setLogged(false);
      console.log("User is not logged in!");
    }
  }

  useEffect(() => {
    checkUser();
  }, [auth, user]);

  return (
    <div>
      {logged == true ? (
        <>
          <ColorModeButton justifySelf={"flex-end"} />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  )
}

export default MainLayout