import Head from "next/head";
import React from "react";
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
  ButtonGroup
} from "@chakra-ui/react";

export default function Home() {
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
              <Tr>
                <Td>João</Td>
                <Td>joaopedro0128@hotmail.com</Td>
                <Td>03/11/2000</Td>
              </Tr>
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
