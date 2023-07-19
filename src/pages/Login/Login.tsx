import { Card, CardBody, Button, Flex, FormControl, FormLabel, Input, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { PiUserSwitchBold } from 'react-icons/pi';
import { MyButton } from "../../components/MyButton/Mybutton";

interface ErrorResponse {
    response: {
        data: {
            mensagem: string;
            status: number;
            success: boolean;
        };
    };
}

interface LoginProps {
    changeIsLogged: (value: boolean) => void;
}

export function Login({changeIsLogged}: LoginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email: email,
                senha: password,

            });
            setMessage(`${response.data.message}`);
            changeIsLogged(true);
            //setIsLoading(false);
        } catch (error) {
            const err: ErrorResponse = error as ErrorResponse;
            console.log("Ocorreu um erro: ", err);
            setMessage(`Erro: ${err.response.data.mensagem} com o código ${err.response.data.status}`);
            //setIsLoading(false);

        } finally {
            setTimeout(() => {
                setIsLoading(false);

            }, 2000); // 1000 = 1 segundo.

        }

    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setMessage ('');
    }

    useEffect( () => {
        console.log('chamou o useEffect com array vazio...');
    }, [])

    //useEffect( () => {
    //    console.log('chamou o useEffect sem array...');
    //})

    return (

        <>
            {
                isLoading ?
                    <>
                        <Flex>
                            <Text
                                fontSize={'1.25rem'}
                                fontWeight={'bold'}
                                color={'whiteAlpha.700'}
                            >
                                Loading, please wait!
                            </Text>
                        </Flex>
                    </> :

                    <Card p={8} rounded={15} bg={'blackAlpha.400'}>
                        <CardBody>

                            {message ? (
                                <Flex mb={8} justify={'center'} width={'100%'}>
                                    <Text
                                        p={'1rem'}
                                        border={'1px'}
                                        px={'2rem'}
                                        rounded={6}
                                        fontSize={'1.25rem'}
                                        fontWeight={'bold'}
                                        bg={'red.700'}
                                        color={'whiteAlpha.700'}>
                                        {message}
                                    </Text>
                                </Flex>
                            ) : <></>}

                            <Flex justify={'center'} mb={8}>
                                <Icon as={PiUserSwitchBold} color={'purple.500'} boxSize={50} />

                            </Flex>

                            <Flex flexDir={"column"} gap={6}>

                                <FormControl>
                                    <FormLabel fontSize={'20'} color={'purple.300'}>
                                        Email
                                    </FormLabel>
                                    <Input placeholder='E-mail' color={'blue.500'} bg={'ActiveCaption'} value={email} onChange={(event) => setEmail(event.target.value)} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'20'} color={'purple.300'}>
                                        Senha
                                    </FormLabel>
                                    <Input type="" placeholder='Senha' color={'blue.500'} bg={'ActiveCaption'} value={password} onChange={(event) => setPassword(event.target.value)} />
                                </FormControl>

                                <MyButton buttonText="Acessar" myColorScheme="red" myOnClick={handleLogin} />
                                <MyButton buttonText="Cadastrar" myColorScheme="blue" />
                                <MyButton buttonText="Limpar" myColorScheme="yellow" myOnClick={clearForm} />

                            </Flex>
                        </CardBody>
                    </Card>

            }
        </>
    )
}