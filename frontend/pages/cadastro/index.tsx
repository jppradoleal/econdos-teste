import Head from "next/head";
import React, { FormEvent } from "react";
import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Center,
  Button,
  Spinner,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";

export default function InsertPage() {
  const [isLoading, setLoading] = useBoolean();
  const toast = useToast();

  async function handleSubmit(e: FormEvent) {
    setLoading.on();

    await fetch("").then(
      () => {
        toast({
          title: "Usuário cadastrado",
          description: "O usuário foi cadastrado e está pronto para consulta",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
      }
    ).catch((err) => {
toast({
        title: "Erro",
        description: "Houve um erro ao cadastrar o usuário, tente novamente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    })

    setLoading.off();
  }

  return (
    <>
      <Head>
        <title>Cadastrar Usuário</title>
      </Head>
      <NavBar />
      <Spinner pos="absolute" top={32} right={12} display={isLoading ? "block" : "none"}/>
      <Center h="100vh">
        <Stack spacing={6} w={"50%"} as="form" noValidate={false}>
          <FormControl isRequired>
            <FormLabel>Nome: </FormLabel>
            <Input />
            <FormHelperText>Pode ser o social 😊</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email: </FormLabel>
            <Input type="email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Data de nascimento: </FormLabel>
            <Input type="date" />
          </FormControl>
          <Button variant="solid" colorScheme="teal" onClick={handleSubmit}>Cadastrar</Button>
        </Stack>
      </Center>
    </>
  );
}
