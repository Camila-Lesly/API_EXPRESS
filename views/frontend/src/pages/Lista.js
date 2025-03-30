import { useState } from "react";
import { Box, Button, VStack, Text, Flex } from "@chakra-ui/react";
import ModalAgregarProducto from "./ModalAgregarProducto"; // Importamos el nuevo modal
import ModalDetalleProducto from "./ModalDetalleProducto"; // Modal para detalle
import "../assets/styles/listaStyle.scss"; // Asegúrate de tener los estilos adecuados

const Lista = ({ lista, agregarProducto, eliminarLista }) => {
  const [productos, setProductos] = useState([]);
  const [isOpenAgregar, setIsOpenAgregar] = useState(false); // Estado para el modal de agregar producto
  const [isOpenDetalle, setIsOpenDetalle] = useState(false); // Estado para el modal de detalle
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para abrir y cerrar el modal de agregar producto
  const abrirModalAgregar = () => setIsOpenAgregar(true);
  const cerrarModalAgregar = () => setIsOpenAgregar(false);

  // Función para abrir y cerrar el modal de detalle
  const abrirModalDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setIsOpenDetalle(true); // Abrir modal de detalle
  };
  const cerrarModalDetalle = () => setIsOpenDetalle(false);

  // Función para agregar producto
  const agregarProductoALista = (producto) => {
    setProductos([...productos, producto]);
    agregarProducto(producto); // Llamamos al prop 'agregarProducto' que viene del componente padre
  };

  return (
    <Box className="lista-box">
      {/* X para eliminar lista */}
      <Text
        className="eliminar-lista"
        onClick={() => eliminarLista(lista.id)} // Llamamos a la función eliminar lista
      >
        &times;
      </Text>

      {/* Lista de productos */}
      <Button className="add-product-button" onClick={abrirModalAgregar}>
        +
      </Button>
      <VStack spacing={2}>
        {productos.map((producto, index) => (
          <Flex
            key={index}
            className="producto-item"
            justify="space-between"
            align="center"
            w="100%"
            mb={3}
            onClick={() => abrirModalDetalle(producto)} // Abre el modal de detalles al hacer clic
          >
            <Text className="nombre">{producto.nombre}</Text>
            <Text className="precio">${producto.precio}</Text>
          </Flex>
        ))}
      </VStack>

      {/* Modal para Agregar Producto */}
      <ModalAgregarProducto 
        isOpen={isOpenAgregar} 
        onClose={cerrarModalAgregar} 
        agregarProducto={agregarProductoALista} 
        usuario={lista.usuario} 
      />

      {/* Modal de Detalles del Producto */}
      {productoSeleccionado && (
        <ModalDetalleProducto
          isOpen={isOpenDetalle}
          onClose={cerrarModalDetalle}
          producto={productoSeleccionado}
        />
      )}
    </Box>
  );
};

export default Lista;
