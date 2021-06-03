import Head from "next/head";
import React from "react";
import useSWR from "swr";
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
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";

interface IUser {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
}

interface IProps {
  users: IUser[];
}

export default function Home({ users }: IProps) {
  console.log(users);
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
                  <Td>{e.dateOfBirth}</Td>
                </Tr>
              ))}
            </Tbody>
            <TableCaption>
              <ButtonGroup>
                <Button>Anterior</Button>
                <Button>Próximo</Button>
              </ButtonGroup>
            </TableCaption>
          </Table>
        </Flex>
      </Box>
    </>
  );
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const users = await fetch(API_URL + "/usuarios").then((data) =>
      data.json()
    );
    return {
      props: {
        users,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};
