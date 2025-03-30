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
            
            console.log('Respuesta completa:', response); // Inspecciona la estructura real
            console.log('Datos recibidos:', response.data); 

            // Versión segura que maneja cualquier estructura de respuesta
            const userData = response.data.user || response.data || {};

            setUserData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                password: ''
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
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        // Validación para contraseña
        if (editingField === 'password') {
            if (!tempValue || tempValue.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }

            if (tempValue !== confirmValue) {
                throw new Error('Las contraseñas no coinciden');
            }

            const response = await axios.put(
                'http://localhost:5000/api/auth/update-password',
                { password: tempValue },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Respuesta del servidor:', response.data);
        } else {
            // Lógica para otros campos
            const response = await axios.put(
                'http://localhost:5000/api/auth/update-profile',
                { [editingField]: tempValue },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Respuesta del servidor:', response.data);
        }

        toast({
            title: 'Éxito',
            description: `Actualización exitosa`,
            status: 'success',
            duration: 3000,
            isClosable: true
        });

        onClose();
    } catch (error) {
        console.error('Error detallado:', error);
        
        toast({
            title: 'Error',
            description: error.response?.data?.message || error.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
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
                                        <FormLabel fontWeight={800}>{getFieldLabel(field)}</FormLabel>
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
                                        className="edit-button"
                                        color={'white'}
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
                            onClick={handleSaveChanges}
                            isLoading={isLoading}
                            isDisabled={!tempValue.trim() || (editingField === 'password' && !confirmValue.trim())}
                            className="modal-save-button"
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