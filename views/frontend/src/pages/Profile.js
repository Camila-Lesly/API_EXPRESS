import { Avatar, Box, Flex, Text, Button, FormControl, FormLabel, Input, Switch, Stack, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast} from "@chakra-ui/react";
import "../assets/styles/profileStyle.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const toast = useToast();

    // Estado para el modal de edición
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingField, setEditingField] = useState("");
    const [tempValue, setTempValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "" // Solo para actualización
  });

    const handleHomeButton = () => {    
        navigate('/dashboard')
    }

    const handleProfileButton = () => {
        navigate('/profile')
    }


// Función para obtener datos
useEffect(() => {
    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Token almacenado:', token)
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUserData({
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                password: ""
            });
        } catch (error) {
            console.error('Error cargando perfil:', error);
            toast({
                title: "Error",
                description: "No se pudieron cargar los datos del perfil",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    fetchUserData();
}, []);


  // Manejo de edición de campos
  const handleEditField = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
    setConfirmValue("");
    onOpen();
};

// Guardar cambios
const handleSaveChanges = async () => {
    if (editingField === 'password' && tempValue !== confirmValue) {
        toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            status: "error",
            duration: 5000,
            isClosable: true
        });
        return;
    }

    setIsLoading(true);
    try {
        const token = localStorage.getItem("token");
        let endpoint = "http://localhost:5000/api/auth/update-profile";
        let payload = { [editingField]: tempValue };

        if (editingField === 'password') {
            endpoint = "http://localhost:5000/api/auth/update-password";
            payload = { password: tempValue };
        }

        await axios.put(endpoint, payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Actualizar estado local sin incluir la contraseña
        setUserData(prev => ({
            ...prev,
            [editingField]: editingField === 'password' ? '' : tempValue
        }));

        toast({
            title: "Actualizado",
            description: `Tu ${getFieldLabel(editingField)} se ha actualizado correctamente`,
            status: "success",
            duration: 3000,
            isClosable: true
        });

        onClose();
    } catch (error) {
        console.error("Error actualizando:", error);
        toast({
            title: "Error",
            description: error.response?.data?.message || "Error al actualizar",
            status: "error",
            duration: 5000,
            isClosable: true
        });
    } finally {
        setIsLoading(false);
    }
};

  // Etiquetas para los campos
  const getFieldLabel = (field) => {
    const labels = {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo electrónico",
        password: "Contraseña"
    };
    return labels[field];
};

    return(
        <Flex direction="column" align="center"  className="profile-container">
            <Box className="header">
                <Text fontSize="2xl" fontWeight={"900"} onClick={handleHomeButton} className="header-button"> Home</Text>
                <Text fontSize="2xl" fontWeight={"900"} onClick={handleProfileButton} className="header-button"> Profile</Text>
            </Box>

            
            <Flex direction="column" align="center" p={8} flex={1}>
                <Box bg="white" borderRadius="lg" boxShadow="md" p={6} w="100%" maxW="2xl">
                    {/* Sección de avatar y nombre */}
                    <Flex align="center" mb={6}>
                        <Avatar 
                            name={`${userData.firstName} ${userData.lastName}`}
                            size="xl"
                            mr={4}
                            bg="teal.500"
                            color="white"
                        />
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                                {userData.firstName} {userData.lastName}
                            </Text>
                            <Text color="gray.500">{userData.email}</Text>
                        </Box>
                    </Flex>

                    <Divider mb={6} />

                    {/* Campos editables */}
                    <Stack spacing={6}>
                        {['firstName', 'lastName', 'email', 'password'].map((field) => (
                            <FormControl key={field}>
                                <Flex justify="space-between" align="center">
                                    <Box flex={1}>
                                        <FormLabel>{getFieldLabel(field)}</FormLabel>
                                        <Text>
                                            {field === 'password' ? '••••••••' : userData[field] || `No ${getFieldLabel(field).toLowerCase()}`}
                                        </Text>
                                    </Box>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={() => handleEditField(field, userData[field])}
                                        ml={4}
                                        isLoading={isLoading}
                                    >
                                        {field === 'password' ? 'Cambiar' : 'Editar'}
                                    </Button>
                                </Flex>
                            </FormControl>
                        ))}
                    </Stack>
                </Box>
            </Flex>

            
            {/* Modal de edición */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar {getFieldLabel(editingField)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel mb={2}>{getFieldLabel(editingField)}</FormLabel>
                            {editingField === 'password' ? (
                                <>
                                    <Input
                                        type="password"
                                        placeholder="Nueva contraseña"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        mb={3}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Confirmar nueva contraseña"
                                        value={confirmValue}
                                        onChange={(e) => setConfirmValue(e.target.value)}
                                    />
                                </>
                            ) : (
                                <Input
                                    type={editingField === 'email' ? 'email' : 'text'}
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                            )}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button 
                            colorScheme="blue" 
                            onClick={handleSaveChanges}
                            isLoading={isLoading}
                            isDisabled={!tempValue.trim() || (editingField === 'password' && !confirmValue.trim())}
                        >
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
        </Flex>
    )
}

export default Profile