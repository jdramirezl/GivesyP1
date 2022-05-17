import { useState, useEffect } from "react";
import {
	ChakraProvider,
	Flex,
	Box
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Productos } from "./components/product/Productos";
import { Producto } from "./components/product/Producto";
import { ProductoModel, ImagenModel, UserModel } from "./models/Models";
import { FetchAll } from "./utils/RestFactory";

export default function App() {
	const [productos, setProductos] = useState<ProductoModel[] | null>(null);
	const [imagenes, setImagenes] = useState<ImagenModel[] | null>(null);

	const CurrUser: UserModel = {
		id: 1,
		first_name: "Steven",
		last_name: "Universe"
	};

	useEffect(() => {
		async function getData() {
			
			const imagenes = await FetchAll<ImagenModel>("imagen");
			
			setImagenes(imagenes.data);
		}
		getData();
	}, []);

	return (
		<ChakraProvider>
			<Box position="fixed" w='100%' zIndex={1}>
				<Navbar />
			</Box>
			<Flex>
				<Box position="fixed" >
					<Sidebar user={CurrUser} setProductos={setProductos}/>
				</Box>
				<Box ml="14%" mt='4em'>
					
					<Productos>
						{productos?.map((prod: ProductoModel, ind) => (
							<Producto
								key={ind}
								producto={prod}
								imagenes={
									imagenes?.filter(
										(img) => prod.id === img.producto
									) || []
								}
							/>
						))}
					</Productos>
				</Box>
			</Flex>
		</ChakraProvider>
	);
}
