import { useState } from "react";
import { Button, Container, Heading, Flex } from "@chakra-ui/react";
import Navbar from "../pages/Navbar";
import Lista from "../pages/Lista"; 
import "../assets/styles/homeStyle.scss";

const Home = () => {
  const [listas, setListas] = useState([]);

  const agregarLista = () => {
    if (listas.length < 3) {
      setListas([...listas, { id: Date.now(), productos: [] }]);
    }
  };

  // Función para borrar una lista
  const borrarLista = (id) => {
    setListas((prevListas) => prevListas.filter((lista) => lista.id !== id));
  };

  // Función para agregar un producto a la lista
  const agregarProductoALista = (id, producto) => {
    setListas((prevListas) =>
      prevListas.map((lista) =>
        lista.id === id
          ? { ...lista, productos: [...lista.productos, producto] }
          : lista
      )
    );
  };

  return (
    <Flex className="home-container">
      <Navbar />
      <Container className="home-box">
        <Heading className="home-title">Merklyst</Heading>

        <Flex className="listas-container">
          {listas.map((lista) => (
            <Lista
              key={lista.id}
              lista={lista}
              agregarProducto={(producto) => agregarProductoALista(lista.id, producto)}
              borrarLista={() => borrarLista(lista.id)} // Pasamos la función de borrar lista
            />
          ))}
        </Flex>

        {listas.length < 3 && (
          <Button className="add-list-button" onClick={agregarLista}>
            Agregar tipo lista +
          </Button>
        )}
      </Container>
    </Flex>
  );
};

export default Home;
