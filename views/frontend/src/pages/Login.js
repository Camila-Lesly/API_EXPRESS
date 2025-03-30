import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text, Link, Flex, Image } from "@chakra-ui/react";
import "../assets/styles/loginStyle.scss";
import axios from "axios";
import { useState } from "react";
import logo from "../assets/icons/imagenReferencia.png";
import RegisterModal from "./RegisterModal";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate(); // Instanciamos history para redirigir
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      console.log("Login exitoso:", response.data);
      localStorage.setItem("token", response.data.token);  // Guardamos el token en el localStorage
      navigate("/dashboard");  // Redirigimos a otra página, por ejemplo, el dashboard
    } catch (error) {
      console.error("Error en el login:", error.response ? error.response.data : error.message);
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
                <Input 
                  type="email" 
                  placeholder="Ingresa tu email" 
                  value={email}  // Vinculamos el valor del input con el estado email
                  onChange={(e) => setEmail(e.target.value)}  // Actualizamos el estado cuando el valor cambia
                  className="input-field" 
                />
              </FormControl>
              <FormControl id="password" isRequired className="form-control">
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  placeholder="Ingresa tu contraseña" 
                  value={password}  // Vinculamos el valor del input con el estado password
                  onChange={(e) => setPassword(e.target.value)}  // Actualizamos el estado cuando el valor cambia
                  className="input-field" 
                />
              </FormControl>
              <Button type="submit" className="button2">Iniciar Sesión</Button>
            </Stack>
          </form>
          <Text className="register-text">
            ¿No tienes cuenta? <Link href="#" className="register-link" onClick={() => setIsRegisterOpen(true)}> Regístrate</Link>
          </Text>
        </Box>
        <Box className="logo-container">
          <Image src={logo} alt="Merkly Logo" className="logo" />
        </Box>
      </Container>
      <Box className="footer">
        <Text className="footer-text">El caos es cambio, trae cambio al orden. </Text>
      </Box>
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </Flex>
  );
}

export default Login;
