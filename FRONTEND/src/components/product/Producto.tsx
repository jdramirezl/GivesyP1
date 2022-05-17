import { useState, useEffect } from "react";
import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	StackProps,
	Button
} from "@chakra-ui/react";
import { Fetch } from "../../utils/RestFactory";
import { ProductoModel, ImagenModel, UserModel } from "../../models/Models";
import { Navigate } from "react-router-dom";

interface Props {
	producto: ProductoModel;
	rootProps?: StackProps;
	imagenes: ImagenModel[];
}

export const Producto = (props: Props) => {
	const { producto, rootProps, imagenes } = props;
	const [redirect, setRedirect] = useState(false);
	const [seller, setSeller] = useState<UserModel | null>(null);

	useEffect(() => {
		async function getData() {
			const res = await Fetch<UserModel>("user", producto.vendedor);
			setSeller(res.data);
		}
		getData();
	}, []);

	return (
		<Center py={12}>
			{redirect && <Navigate to={`/producto/${producto.id}`} />}
			<Box
				role={"group"}
				p={6}
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"lg"}
				pos={"relative"}
				
			>
				<Box
					rounded={"lg"}
					mt={-12}
					pos={"relative"}
					height={"230px"}
					_after={{
						transition: "all .3s ease",
						content: '""',
						w: "full",
						h: "full",
						pos: "absolute",
						top: 5,
						left: 0,
						filter: "blur(15px)",
						zIndex: -1
					}}
					_groupHover={{
						_after: {
							filter: "blur(20px)"
						}
					}}
				>
					<Image
						rounded={"lg"}
						height={230}
						width={282}
						objectFit={"cover"}
						src={imagenes[0]?.imagen}
					/>
				</Box>
				<Stack pt={10} align={"center"}>
					<Text
						color={"gray.500"}
						fontSize={"sm"}
						textTransform={"uppercase"}
					>
						{seller?.first_name + " " + seller?.last_name}
					</Text>
					<Heading
						fontSize={"2xl"}
						fontFamily={"body"}
						fontWeight={500}
					>
						{producto.titulo}
					</Heading>
					<Stack direction={"row"} align={"center"}>
						<Button onClick={() => setRedirect(true)}>
							Detalles
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
};
