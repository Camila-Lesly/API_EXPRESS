import { useState } from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import "../assets/styles/modalAgregarProductoStyle.scss";

const ModalAgregarProducto = ({ isOpen, onClose, agregarProducto }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  // Manejo de imágenes con Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setNuevoProducto({ ...nuevoProducto, imagen: acceptedFiles[0] });
    },
  });

  // Agregar el producto y cerrar modal
  const handleAgregar = () => {
    agregarProducto(nuevoProducto);  // Llamamos a la función de agregar producto
    onClose();  // Cerramos el modal
    setNuevoProducto({ nombre: "", precio: "", descripcion: "", imagen: null }); // Limpiamos el formulario
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Agregar Producto</DrawerHeader>
        <DrawerBody>
          <Input name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleChange} mb={3} />
          <Input name="precio" type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={handleChange} mb={3} />
          <Textarea name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleChange} mb={3} />

          {/* Dropzone para subir imágenes */}
          <Box {...getRootProps()} border="2px dashed #ccc" p={5} textAlign="center" cursor="pointer">
            <input {...getInputProps()} />
            {nuevoProducto.imagen ? <Text>{nuevoProducto.imagen.name}</Text> : <Text>Arrastra o haz clic para subir una imagen</Text>}
          </Box>

          <Button colorScheme="green" onClick={handleAgregar} mt={4} w="100%">
            Guardar Producto
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalAgregarProducto;
