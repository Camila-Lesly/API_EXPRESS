import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import axios from "axios";

const RegisterModal = ({ isOpen, onClose }) => {  // Recibe `isOpen` y `onClose` desde Login.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      console.log("Registro exitoso:", response.data);
      localStorage.setItem("token", response.data.token);
      onClose(); // Cierra el modal tras el registro exitoso
    } catch (error) {
      console.error("Error al registrarse:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleRegister}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="green">Registrarse</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
