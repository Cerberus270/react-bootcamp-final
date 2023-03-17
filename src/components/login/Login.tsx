import React from 'react'
import {
    Box, Text, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Link,
    Button
} from "@chakra-ui/react"

const Login = () => {
    return (
        <>
            <Container>
                <Box marginTop={5}>
                    <Text textAlign={"center"} marginBottom={'16'}>Login</Text>
                    <FormControl my={5}>
                        <Input type='email' placeholder='Email' />
                    </FormControl>
                    <FormControl my={5}>
                        <Input type='password' placeholder='Password' />
                    </FormControl>
                    
                    <Button colorScheme='blue'>Button</Button>
                </Box>
            </Container>
        </>
    )
}

export default Login