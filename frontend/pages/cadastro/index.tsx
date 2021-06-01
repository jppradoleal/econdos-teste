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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NavBar from "../../components/NavBar";

type IUserForm = {
  nome: string,
  email: string,
  dataDeNascimento: string,
}

export default function InsertPage() {
  const [isLoading, setLoading] = useBoolean();
  const toast = useToast();
  const {register, handleSubmit, formState: {errors}} = useForm<IUserForm>();


  async function submitData(data: IUserForm) {
    setLoading.on();
    console.log(data);

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL!)
      .then(() => {
        toast({
          title: "Usuário cadastrado",
          description: "O usuário foi cadastrado e está pronto para consulta",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro",
          description: "Houve um erro ao cadastrar o usuário, tente novamente",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });

    setLoading.off();
  }

  return (
    <>
      <Head>
        <title>Cadastrar Usuário</title>
      </Head>
      <NavBar />
      <Spinner
        pos="absolute"
        top={32}
        right={12}
        display={isLoading ? "block" : "none"}
      />
      <Center h="100vh">
        <Stack spacing={6} w={"50%"} as="form" onSubmit={handleSubmit(submitData)}>
          <FormControl isRequired isInvalid={!!errors?.nome}>
            <FormLabel>Nome: </FormLabel>
            <Input {...register("nome")}/>
            <FormHelperText>Pode ser o social 😊</FormHelperText>
            <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email: </FormLabel>
            <Input type="email" {...register("email")}/>
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Data de nascimento: </FormLabel>
            <Input type="date" {...register("dataDeNascimento")}/>
            <FormErrorMessage>{errors?.dataDeNascimento?.message}</FormErrorMessage>
          </FormControl>
          <Button variant="solid" colorScheme="teal" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </Center>
    </>
  );
}
