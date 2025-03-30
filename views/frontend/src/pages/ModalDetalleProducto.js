import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box, Image, VStack } from "@chakra-ui/react";
import "../assets/styles/modalDetalleStyle.scss"; // Asegúrate de que el path sea correcto

const ModalDetalleProducto = ({ isOpen, onClose, producto }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent className="detalle-producto-modal">
        <ModalHeader>Detalles del Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="center">
            {producto.imagen && (
              <Box className="product-image" mb={4}>
                <Image
                  src={URL.createObjectURL(producto.imagen)}
                  alt={producto.nombre}
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="8px"
                  boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
                />
              </Box>
            )}
            <Box className="product-details">
              <Text className="product-name">{producto.nombre}</Text>
              <Text className="product-price">${producto.precio}</Text>
              <Text className="product-description">{producto.descripcion}</Text>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetalleProducto;
