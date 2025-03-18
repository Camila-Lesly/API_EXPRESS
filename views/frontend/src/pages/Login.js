import { 
  Box, 
  Button, 
  Container, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  Heading, 
  Text, 
  Link, 
  Flex, 
  useColorModeValue 
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="black"
    >
      <Container maxW="sm" py={12}>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="2xl"
          bg="rgba(20, 20, 20, 0.9)"
          color="white"
        >
          <Heading size="lg" mb={6} textAlign="center" color="blue.400">
            Bienvenido
          </Heading>
          <form>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel color="gray.300">Email</FormLabel>
                <Input type="email" placeholder="Ingresa tu email" bg="gray.800" borderColor="gray.600" _focus={{ borderColor: "blue.400" }} color="white" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color="gray.300">Password</FormLabel>
                <Input type="password" placeholder="Ingresa tu contraseña" bg="gray.800" borderColor="gray.600" _focus={{ borderColor: "blue.400" }} color="white" />
              </FormControl>
              <Button bg="blue.500" _hover={{ bg: "blue.700" }} color="white" type="submit" width="full" mt={4}>
                Iniciar sesión
              </Button>
              <Text textAlign="center" fontSize="sm" color="gray.300">
                ¿No tienes cuenta? <Link color="blue.400" href="#">Regístrate</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
