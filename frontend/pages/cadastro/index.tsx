import Head from "next/head";
import {useRouter} from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NavBar from "../../components/NavBar";

interface IUser {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function InsertPage() {
  const [isLoading, setLoading] = useBoolean();
  const [id, setId] = useState<string | string[]>();
  const toast = useToast();
  const {query, push} = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<IUser>();


  useEffect(() => {
    (async function getUser() {
      if(!!query.id) {
        setId(query.id);
        const user: IUser = await fetch(API_URL + `/usuarios/${query.id}`).then(response => response.json()); 
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("dateOfBirth", user.dateOfBirth);
      }
    })();
  }, []);

  async function submitData(data: IUser) {
    setLoading.on();

    const body = {
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
    };

    await fetch(`${API_URL}/usuarios${id ? "/" + id : ""}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        toast({
          title: `Usuário ${id ? "atualizado" : "cadastrado"}`,
          description: `O usuário foi ${id ? "atualizado" : "cadastrado"} e está pronto para consulta`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        push("/");
      })
      .catch((err) => {
        toast({
          title: "Erro",
          description: `Houve um erro ao ${id ? "atualizar" : "cadastrar"} o usuário, tente novamente.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.log(err);
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
        <Stack
          spacing={6}
          w={"50%"}
          as="form"
          onSubmit={handleSubmit(submitData)}
        >
          <FormControl isRequired isInvalid={!!errors?.name}>
            <FormLabel>Nome: </FormLabel>
            <Input {...register("name")} />
            <FormHelperText>Pode ser o social 😊</FormHelperText>
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email: </FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Data de nascimento: </FormLabel>
            <Input type="date" {...register("dateOfBirth")} />
            <FormErrorMessage>
              {errors?.dateOfBirth?.message}
            </FormErrorMessage>
          </FormControl>
          <Button variant="solid" colorScheme="teal" type="submit">
          {id ? "Atualizar" : "Cadastrar"}
          </Button>
        </Stack>
      </Center>
    </>
  );
}
