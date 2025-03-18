import { Box, Button, Container, Field, FieldLabel, Input, VStack, Heading} from "@chakra-ui/react";



const Login = () => {
  return (
    <Container centerContent>
      <Box p={8} maxW="md" borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading size="lg" mb={6}>Login</Heading>
        <form>
          <VStack spacing={4}>
            <Field id="email" isRequired>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
              />
            </Field>
            <Field id="password" isRequired>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
              />
            </Field>
            <Button colorScheme="blue" type="submit" width="full">Login</Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;