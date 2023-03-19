import React from 'react'
import {
    Box, Text, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
    Link,
    Button,
    Image,
    AbsoluteCenter,
    Center
} from "@chakra-ui/react"

const Login = () => {
    return (
        <>
            <Container maxWidth={'sm'} shadow={'lg'} p={"8"}>
                <Box marginTop={5}>
                    <Box position='relative' h='50'>
                        <AbsoluteCenter>
                            <Image src='https://www.focusservices.com/wp-content/uploads/2018/10/logo-grey-286x156.png' alt='FocusIto Logo' />
                        </AbsoluteCenter>
                    </Box>

                    <Text textAlign={"center"} my={"10"}>Login</Text>

                    <FormControl my={5}>
                        <Input type='email' placeholder='Email' />
                    </FormControl>
                    <FormControl my={5}>
                        <Input type='password' placeholder='Password' />
                    </FormControl>

                    <Text fontSize={"sm"} mb={"4"} color="blue.600">Forgot Password?</Text>

                    <Button colorScheme='blue' width={'full'}>Login</Button>

                    <Text textAlign={"center"} fontSize={"sm"} py={"55"}>Don't have an account? <Link color={"blue.600"}>Sign In</Link></Text>
                </Box>
            </Container>
        </>
    )
}

export default Login