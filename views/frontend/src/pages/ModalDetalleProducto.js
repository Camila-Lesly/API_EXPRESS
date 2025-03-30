import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box, Image, VStack } from "@chakra-ui/react";

const ModalDetalleProducto = ({ isOpen, onClose, producto }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles del Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {producto.imagen && (
              <Box mb={4}>
                <Image
                  src={URL.createObjectURL(producto.imagen)}
                  alt={producto.nombre}
                  boxSize="250px"
                  objectFit="cover"
                />
              </Box>
            )}
            <Text fontWeight="bold" fontSize="xl">{producto.nombre}</Text>
            <Text fontSize="lg">${producto.precio}</Text>
            <Text>{producto.descripcion}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetalleProducto;
