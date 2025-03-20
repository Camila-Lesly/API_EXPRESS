
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text, Link, Flex } from "@chakra-ui/react";
import "../assets/styles/loginStyle.scss";
import logo from "../assets/icons/logo.png";
import bg from "../assets/icons/background.jpg";


const Login = () => {
  return (
    <Flex className="login-container" align="center" justify="center" minH="100vh">
      <Container maxW="md" className="login-box">
        <Box p={5} borderRadius="sm" className="login-box-inner">
          <Heading size="lg" className="login-heading" textAlign="center">
            Merkly
          </Heading>
          <form>
            <Stack spacing={4}>
              <FormControl id="email" isRequired className="form-control">
                <FormLabel>Email*</FormLabel>
                <Input type="email" placeholder="Ingresa tu email" className="input-field" />
              </FormControl>
              <FormControl id="password" isRequired className="form-control">
                <FormLabel>Password*</FormLabel>
                <Input type="password" placeholder="Ingresa tu contraseña" className="input-field" />
              </FormControl>
              <Button type="submit" width="full" className="button">
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
          <Text textAlign="center" fontSize="sm" className="register-text">
            ¿No tienes cuenta? <Link href="#">Regístrate</Link>
          </Text>
        </Box>
      </Container>
      <Box className="logo-container">
      {/* <img src={logo} alt="Merkly Logo" /> */}
      </Box> 

      {/* <Box className="footer">
        <Text className="footer-text">merkly@gmail.com</Text>
      </Box> */}
    </Flex>
  );
};

export default Login;

