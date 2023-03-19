import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import ColorModeButton from "../components/ColorModeButton"

const AuthLayout = () => {
    return (
        <Box fontSize={"xl"}>
            <ColorModeButton justifySelf={"flex-end"} />
            <Outlet />
        </Box>
    )
}

export default AuthLayout