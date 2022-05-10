import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Productos } from "./components/product/Productos";
import { Producto } from "./components/product/Producto";
import { ProductoModel, ImagenModel } from "./models/Models";
import { FetchAll } from "./utils/RestFactory";

export default function App() {
  const productos = FetchAll<ProductoModel>("producto");
  const imagenes = FetchAll<ImagenModel>("imagen");

  return (
    <ChakraProvider>
      <Navbar />
      <Productos>
        {productos?.map((prod: ProductoModel) => (
          <Producto
            producto={prod}
            imagenes={
              imagenes?.filter((img) => prod.id == img.producto) || []
            }
          />
        ))}
      </Productos>
    </ChakraProvider>
  );
}
