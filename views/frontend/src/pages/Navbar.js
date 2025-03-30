import { Box, Flex, Link } from "@chakra-ui/react";
import "../assets/styles/navbarStyle.scss"; // Importamos el archivo de estilos

const Navbar = () => {
  return (
    <Box className="navbar" w="100%">
      <Flex className="nav-links">
        <Link href="#">Home</Link>
        <Link href="#">Perfil</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
