import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Text,
	Flex,
	VStack,
	Button,
	Center
} from "@chakra-ui/react";
import { FetchAll, Fetch } from "../../utils/RestFactory";
import { ImagenModel, ProductoModel, UserModel } from "../../models/Models";
import ImageSlider from "../images/Slider";

export default function ProductoDetail() {
	const [producto, setProducto] = useState<ProductoModel | null>(null);
	const [vendedor, setVendedor] = useState<UserModel | null>(null);
	const [imagenes, setImagenes] = useState<ImagenModel[] | null>(null);

	let params = useParams();

	useEffect(() => {
		async function getData(prodId: string) {
			const prod = await Fetch<ProductoModel>(
				"producto",
				parseInt(prodId)
			);
			setProducto(prod.data);
			const sell =
				(await Fetch<UserModel>("user", producto?.vendedor ?? 1)) ??
				null;
			setVendedor(sell.data);
			const imgs = await FetchAll<ImagenModel>("imagen", {
				params: { producto: prodId }
			});
			setImagenes(imgs.data);
		}

		const prodId = params.prodId;
		getData(prodId ?? "0");
	}, [params.prodId, producto?.vendedor]);

	return (
		<>
			<Center w="100%" h="100%">
				<Flex w="90%" h="100%">
					<Box w="55%">
						<ImageSlider
							data={imagenes?.map((img) => ({
								image: img.imagen,
								caption: ""
							}))}
						/>
					</Box>
					<Box w="30%" ml="10%">
						<Center h="95%" w="60%" minH="400px">
							<VStack align="start" spacing="20%">
								<Box w="600px">
									<Text fontSize="6xl" fontWeight="bold">
										{producto?.titulo}
									</Text>
									<Text color="gray.500">
										{"Creado el: " +
											producto?.creado.substring(0, 10)}
									</Text>
								</Box>
								<Box>
									<Text fontSize="4xl" fontWeight="bold">
										{" "}
										Descripcion{" "}
									</Text>
									<Text fontSize="3xl">
										{" "}
										{producto?.descripcion}{" "}
									</Text>
								</Box>
								<Box>
									<Text color="gray.500">
										{" "}
										{`Vendido por: ${vendedor?.first_name} ${vendedor?.last_name}`}{" "}
									</Text>
									<Button
										onClick={() => console.log("CHANGE")}
									>
										Contactar al ofertante
									</Button>
								</Box>
							</VStack>
						</Center>
					</Box>
				</Flex>
			</Center>
		</>
	);
}
