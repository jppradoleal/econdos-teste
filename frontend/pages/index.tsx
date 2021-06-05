import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { MdDelete, MdEdit } from "react-icons/md";
import NavBar from "../components/NavBar";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  TableCaption,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";

interface IUser {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
}

interface IApiResponse {
  users: IUser[];
  amount: number;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const limit = 5;

  const [users, setUsers] = useState<IUser[]>([]);
  const [start, setStart] = useState(0);
  const [maxUsers, setMaxUsers] = useState(0);
  const [idToDelete, setIdToDelete] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function getMore(start: number, amount: number) {
    const data: IApiResponse = await fetch(
      API_URL + `/usuarios?amount=${amount}&offset=${start}`
    ).then((response) => response.json());
    setMaxUsers(data.amount);
    setUsers(data.users);
    console.log(data);
  }

  useEffect(() => {
    getMore(start, limit);
  }, [start]);

  async function handleDelete(id: number) {
    try {
      await fetch(API_URL + `/usuarios/${id}`, {method: "DELETE"});
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído e não estará disponível para consulta",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      getMore(start, limit);
      onClose();
    } catch (e) {
      toast({
        title: "Erro ao excluir o usuário",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <NavBar />
      <Box>
        <Flex
          direction="row"
          w="100vw"
          h="100vh"
          justifyContent="center"
          pt={"120px"}
          px={60}
        >
          <Table colorScheme="gray" variant="striped">
            <Thead>
              <Tr>
                <Th>
                  <Text>Nome</Text>
                </Th>
                <Th>
                  <Text>Email</Text>
                </Th>
                <Th>
                  <Text>Data de Nascimento</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((e) => (
                <Tr key={e.id}>
                  <Td>{e.name}</Td>
                  <Td>{e.email}</Td>
                  <Td>{dayjs(e.dateOfBirth).format("DD/MM/YYYY")}</Td>
                  <Td>
                    <IconButton
                      aria-label="Deletar"
                      colorScheme="red"
                      icon={<MdDelete />}
                      onClick={() => {
                        setIdToDelete(e.id);
                        onOpen();
                      }}
                    />{" "}
                    <Link
                      href={{
                        pathname: "/cadastro",
                        query: {
                          id: e.id,
                        },
                      }}
                    >
                      <IconButton
                        aria-label="Editar"
                        colorScheme="teal"
                        icon={<MdEdit />}
                      />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <TableCaption>
              <ButtonGroup>
                <Button
                  disabled={start - limit < 0}
                  onClick={() => {
                    setStart((pastValue) => pastValue - limit);
                  }}
                >
                  Anterior
                </Button>
                <Button
                  disabled={start > maxUsers - limit}
                  onClick={() => {
                    setStart((pastValue) => pastValue + limit);
                  }}
                >
                  Próximo
                </Button>
              </ButtonGroup>
            </TableCaption>
          </Table>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tem certeza que deseja excluir este registro?</ModalHeader>
          <ModalBody>
            <Text>Você está excluindo um registro e não poderá recuperar mais tarde.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete(idToDelete)}>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
