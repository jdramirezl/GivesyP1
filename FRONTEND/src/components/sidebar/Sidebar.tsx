import { useState, useEffect } from "react";
import {
	Flex,
	Text,
	IconButton,
	Divider,
	Avatar,
	Heading,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
	Button,
	ButtonGroup,
	Spacer,
	useDisclosure,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Select,
	Textarea,
	Image,
	VStack,
	Box,
	Center
} from "@chakra-ui/react";
import {
	FiMenu,
	FiHome,
	FiCalendar,
	FiUser,
	FiDollarSign,
	FiBriefcase,
	FiSettings
} from "react-icons/fi";
import { ProductoModal } from "../product/ProductoModal";
import { UserModel, CategoriaModel, ProductoModel } from "../../models/Models";
import { FetchAll } from "../../utils/RestFactory";

interface Props {
	user: UserModel;
	setProductos: Function;
}

export default function Sidebar(props: Props) {
	const { user, setProductos } = props;
	const [navSize, changeNavSize] = useState("large");
	const [cate, setCate] = useState("");
	const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
	const [keepProds, setKeepProds] = useState<ProductoModel[] | null>(null);

	useEffect(() => {
		async function getData() {
			const productos = await FetchAll<ProductoModel>("producto");
			const cats = await FetchAll<CategoriaModel>("categoria");
			setCategorias(cats?.data);
			setCategorias((categorias) => [
				...categorias,
				{
					id: -1,
					nombre: "Elige una categoria"
				}
			]);

			setKeepProds(productos?.data);
			setProductos(productos.data);
		}
		getData();
	}, []);

	const onSubmit = (e: any) => {
		e.preventDefault();
		if (cate == "-1") setProductos(keepProds);
		else
			setProductos(
				keepProds?.filter((p) => String(p.categoria) === cate)
			);
	};

	return (
		<Flex
			pos="sticky"
			left="5"
			h="95vh"
			marginTop="2.5vh"
			boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
			borderRadius={navSize == "small" ? "15px" : "30px"}
			w={navSize == "small" ? "75px" : "200px"}
			flexDir="column"
			justifyContent="space-between"
		>
			<Flex
				p="5%"
				mt={10}
				flexDir="column"
				w="100%"
				alignItems={navSize == "small" ? "center" : "flex-start"}
				as="nav"
				h="100%"
			>
				<form onSubmit={onSubmit}>
					<FormControl isRequired>
						<Center w="200px">
							<VStack
								w="300px"
								spacing="30px"
								h="50em"
								justify="space-between"
							>
								<Box>
									<Text fontWeight="bold" fontSize="4xl">
										Filtrar
									</Text>
									<Box width="90%" mt={5}>
										<FormLabel htmlFor="categoria">
											Categoria
										</FormLabel>
										<Select
											id="categoria"
											onChange={(event) =>
												setCate(event.target.value)
											}
										>
											{categorias?.reverse().map((c, ind) => {
												return (
													<option
														key={ind}
														value={c.id}
													>
														{c.nombre}
													</option>
												);
											})}
										</Select>
									</Box>
								</Box>
								<Box >
								<Button colorScheme="blue" ml="-3" type="submit">
									{"Filtrar"}
								</Button>
								</Box>
							</VStack>
						</Center>
					</FormControl>
				</form>
			</Flex>

			<Flex
				p="5%"
				flexDir="column"
				w="100%"
				alignItems={navSize == "small" ? "center" : "flex-start"}
				mb={4}
			>
				<Divider display={navSize == "small" ? "none" : "flex"} />
				<Flex mt={4} pt={3} ml={7} align="center">
					<ProductoModal mode={"Crear Producto"} user={user} />
				</Flex>
			</Flex>
		</Flex>
	);
}
