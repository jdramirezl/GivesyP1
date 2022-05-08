import * as React from "react";
import { ChakraProvider} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Productos } from "./components/product/Productos";
import { Producto } from "./components/product/Producto";
import { ProductoModel } from "./models/ProductoModel";
import { baseURL } from "./config";
import axios from "axios";
import { useQuery } from "react-query";

export default function App() {
  const fetchProductos = async () => {
    const res = await axios.get<ProductoModel[]>(`${baseURL}api/producto/`);
    return res.data;
  };

  const { data } = useQuery("producto", fetchProductos);

  return (
      <ChakraProvider>
        <Navbar></Navbar>
        <Productos>
          {data?.map((producto: ProductoModel) => (
            <Producto producto={producto} />
          ))}
        </Productos>
      </ChakraProvider>
  );
}


