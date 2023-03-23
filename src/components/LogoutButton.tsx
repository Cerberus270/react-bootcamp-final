import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import { logout } from '../utils/sdk'

const LogoutButton = () => {
    const navigate = useNavigate();
    const store = useStore();
    
    const executeExit = () => {
        if (logout()) {
            store.reset();
            navigate("/");
        } else {
            alert("Error al cerrar la sesion");
        }
    }
    return (
        <Button colorScheme={"red"} onClick={executeExit}>Sign Out</Button>
    )
}

export default LogoutButton