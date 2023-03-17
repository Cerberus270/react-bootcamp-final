import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">


const ColorModeButton: React.FC<ColorModeSwitcherProps> = (props) => {
    // This button is from the default template of chakra-ui with create-react-app, but forked to Vite, that has not default chakra-ui template
    const { toggleColorMode } = useColorMode()
    const text = useColorModeValue("dark", "light")
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)

    return (
        <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            aria-label={`Switch to ${text} mode`}
            {...props}
        />
    )
}

export default ColorModeButton