import {
  Stack,
  Link as StyledLink,
  Text,
  Flex,
  Box,
  useBoolean,
} from "@chakra-ui/react";
import { MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";

export default function NavBar() {
  const [open, setOpen] = useBoolean(true);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      pos="absolute"
      mb={8}
      p={8}
      bg={"teal.500"}
      color={"white"}
    >
      <Box display={{ base: "block", md: "none" }} onClick={setOpen.toggle}>
        {open ? <MdClose size={16} /> : <MdMenu size={16} />}
      </Box>
      <Box
        display={{ base: open ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          direction={["column", "row", "row", "row"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          align="center"
          spacing={8}
          pt={[4, 4, 0, 0]}
        >
          <Link href="/">
            <StyledLink>
              <Text display="block">Visualizar</Text>
            </StyledLink>
          </Link>
          <Link href="/cadastro">
            <StyledLink>
              <Text display="block">Cadastrar</Text>
            </StyledLink>
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
}
