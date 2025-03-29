import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Stack, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import "../assets/styles/registerStyle.scss";

const RegisterModal = ({ isOpen, onClose }) => {  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();  // Hook para usar Toast
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", { firstName, lastName, email, password, confirmPassword });
        console.log("Registro exitoso:", response.data);
        localStorage.setItem("token", response.data.token);
        onClose(); // Cierra el modal tras el registro exitoso
      } catch (error) {
        console.error("Error al registrarse:", error.response ? error.response.data : error.message);
        
        // Muestra un Toast con el error
        toast({
          title: "Error",
          description: error.response ? error.response.data.message : "Error desconocido. Intenta nuevamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
          className: 'custom-toast' // Aplica la clase personalizada
        });
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="custom-modal">  {/* Aplica la clase personalizada */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleRegister}>
              <Stack spacing={4}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
  
                <FormControl id="lastName" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
  
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
  
                <FormControl id="password" isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
  
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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