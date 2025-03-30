import { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalDetalleProducto from "./ModalDetalleProducto"; // Modal para detalles del producto

const Lista = ({ lista, agregarProducto, borrarLista }) => {
  const [productos, setProductos] = useState(lista.productos);
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir y cerrar el modal de agregar producto
  const abrirModal = () => setIsOpen(true);
  const cerrarModal = () => setIsOpen(false);

  // Función para abrir el modal con los detalles del producto
  const verDetallesProducto = (producto) => {
    setProductoSeleccionado(producto);
    setIsModalOpen(true);
  };

  const cerrarModalDetalles = () => {
    setIsModalOpen(false);
  };

  const agregarProductoALista = (producto) => {
    agregarProducto(producto);
    setProductos((prevProductos) => [...prevProductos, producto]); // Agregar producto localmente
    cerrarModal(); // Cerrar modal después de agregar
  };

  return (
    <Box className="lista-box">
      <Button className="add-product-button" onClick={abrirModal}>
        +
      </Button>

      {/* Botón para borrar la lista */}
      <Button className="delete-list-button" onClick={borrarLista}>
        Eliminar Lista
      </Button>

      <VStack>
        {productos.map((producto, index) => (
          <Box key={index} onClick={() => verDetallesProducto(producto)} cursor="pointer">
            <Text>{producto.nombre}</Text>
          </Box>
        ))}
      </VStack>

      {/* Modal para Agregar Producto */}
      <ModalAgregarProducto isOpen={isOpen} onClose={cerrarModal} agregarProducto={agregarProductoALista} />

      {/* Modal para Mostrar Detalles del Producto */}
      {productoSeleccionado && (
        <ModalDetalleProducto
          isOpen={isModalOpen}
          onClose={cerrarModalDetalles}
          producto={productoSeleccionado}
        />
      )}
    </Box>
  );
};

export default Lista;
