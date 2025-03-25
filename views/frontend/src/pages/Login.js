import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text, Link, Flex, Image } from "@chakra-ui/react";
import "../assets/styles/loginStyle.scss";
import axios from "axios";
import { useState } from "react";
import logo from "../assets/icons/imagenReferencia.png";

const Login = () => {
  
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // Función para manejar el login
   const handleLogin = async (e) => {
     e.preventDefault();

     console.log("Datos a enviar:", { email, password });

     try {
       // Enviar la solicitud POST a la API de Express
       const response = await axios.post("http://localhost:5000/api/auth/login", {
         email,
         password
       });

       // Aquí puedes guardar el JWT en el almacenamiento local o redirigir al usuario
       console.log("Login exitoso:", response.data);

       // Ejemplo: Guardar el JWT en el almacenamiento local
       localStorage.setItem("token", response.data.token);

       // Redirigir o realizar otras acciones
     } catch (error) {
       console.error("Error al iniciar sesión:", error.response ? error.response.data : error.message);
     }
   };
  
  
  
  
  return (
    <Flex className="login-container">
      <Container maxW="lg" className="login-box">
        <Box className="login-box-inner">
          <Heading size="lg" className="login-heading">Merkly</Heading>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired className="form-control">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Ingresa tu email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired className="form-control">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Ingresa tu contraseña" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </FormControl>
              <Button type="submit" className="button2">Iniciar Sesión</Button>
            </Stack>
          </form>
          <Text className="register-text">
            ¿No tienes cuenta? <Link href="#" className="register-link">Regístrate</Link>
          </Text>
        </Box>
        <Box className="logo-container">
          <Image src={logo} alt="Merkly Logo" className="logo" />
        </Box>
      </Container>
      <Box className="footer">
        <Text className="footer-text">El caos es cambio, trae cambio al orden. </Text>
      </Box>
    </Flex>
  );
}

export default Login;
