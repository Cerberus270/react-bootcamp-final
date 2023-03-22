import {
    Box, Text, FormControl,
    FormErrorMessage,
    Input,
    Container,
    Link,
    Button,
    Image,
    AbsoluteCenter,
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/db";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

    const store = useStore();
    const navigate = useNavigate();


    // onSubmit from Form
    const onSubmit = (data: any) => {
        console.log(data);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);
                store.setUser(user);
                console.log("gg", store.user);
                navigate("/admin");
            })
            .catch((error) => {
                alert("Error al Iniciar Sesion")
            });
    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl id="email" my={5} isInvalid={Boolean(errors.email)}>
                            <Input type='email' placeholder='Email' {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Please enter a valid email"
                                }
                            })} />

                            {Boolean(errors.email) && (
                                <FormErrorMessage>
                                    {errors.email?.message?.toString()}
                                </FormErrorMessage>
                            )}

                        </FormControl>
                        <FormControl my={5} isInvalid={Boolean(errors.password)}>
                            <Input type='password' placeholder='Password'
                                {...register("password", {
                                    required: 'Password is required'
                                })} />

                            {Boolean(errors.password) && (
                                <FormErrorMessage>
                                    {errors.password?.message?.toString()}
                                </FormErrorMessage>
                            )}

                        </FormControl>

                        <Text fontSize={"sm"} mb={"4"} color="blue.600">Forgot Password?</Text>

                        <Button colorScheme='blue' type='submit' width={'full'}>Login</Button>
                    </form>

                    <Text textAlign={"center"} fontSize={"sm"} py={"55"}>Don't have an account? <Link color={"blue.600"}>Sign In</Link></Text>
                </Box>
            </Container>
        </>
    )
}

export default Login