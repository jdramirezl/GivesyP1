import { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Flex,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Select,
	Textarea,
	Text,
	VStack,
	Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
	CategoriaModel,
	UserModel,
	ProductoModel,
	ImagenModel
} from "../../models/Models";
import {
	FetchAll,
	Create,
	Update,
	Delete
} from "../../utils/RestFactory";
import { Imagen } from "../images/Imagen";
import { Imagenes } from "../images/Imagenes";

interface ProdModProps {
	mode: string;
	user: UserModel;
	producto?: ProductoModel;
}

export const ProductoModal = (pmprops: ProdModProps) => {
	// Props
	const { mode, user, producto } = pmprops;

	// States
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [titulo, setTitulo] = useState(producto?.titulo || "");
	const [desc, setDesc] = useState(producto?.descripcion || "");
	const [cate, setCate] = useState(producto?.categoria || "");
	const [files, setFiles] = useState<FileList | null>(null);
	const [newFiles, setNewFiles] = useState<ImagenModel[] | null>(null);
	const [categorias, setCategorias] = useState<CategoriaModel[] | null>(null);

	useEffect(() => {
		async function getData() {
			const cats = await FetchAll<CategoriaModel>("categoria");
			const allImgs = await FetchAll<ImagenModel>("imagen", {
				params: { producto: producto?.id }
			});
			setNewFiles(allImgs?.data);
			setCategorias(cats?.data);
		}
		getData();
	}, [producto?.id]);

	// Body
	let navigate = useNavigate();
	async function handleSubmit(event: any) {
		event.preventDefault();

		const body = {
			titulo: titulo,
			descripcion: desc,
			categoria: String(cate),
			vendedor: String(user.id)
		};

		let res: any;

		if (!producto) res = await Create<ProductoModel>("producto", body);
		else await Update<ProductoModel>("producto", body, producto.id);

		if (producto) res = producto;
		else res = res.data;

		for (let i = 0; i < (files?.length ?? 0); i++) {
			const file = files ? files[i] : null;
			if (!file) continue;

			let form_data = new FormData();
			form_data.append("imagen", file);
			form_data.append("producto", String(res.id));
			const config = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			};
			await Create<ImagenModel>("imagen", form_data, config);
		}
		onClose();
		navigate(0);
	}

	function filterPrev(file: File, files: FileList) {
		const dt = new DataTransfer();

		for (let i = 0; i < files.length; i++) {
			const cfile = files[i];
			if (cfile !== file) dt.items.add(cfile);
		}

		setFiles(dt.files);
		if (dt.files.length === 0) setFiles(null);
	}

	async function filterExistent(img: any) {
		const res = await Delete<ImagenModel>("imagen", img.id);
		setNewFiles(newFiles?.filter((i) => i.id !== res.data.id) || null);
	}

	const getPrevs = (files: FileList) => {
		let res: File[] = [];
		for (let i = 0; i < (files?.length ?? 0); i++) {
			res.push(files[i]);
		}
		return res;
	};

	return (
		<>
			<Flex justifyContent="flex-end">
				<Button mt="1%" mr="1%" onClick={onOpen}>
					{mode}
				</Button>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose} size={"xl"} >
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{mode}</ModalHeader>
					<form onSubmit={handleSubmit}>
						<ModalBody>
							<FormControl isRequired>
								<VStack align="start" spacing="10px">
									<Box width="100%">
										<FormLabel htmlFor="nombre">
											Nombre
										</FormLabel>
										<Input
											id="nombre"
											onChange={(event) =>
												setTitulo(
													event.currentTarget.value
												)
											}
										/>
									</Box>

									<Box width="100%">
										<FormLabel htmlFor="descripcion">
											Descripcion
										</FormLabel>
										<Textarea
											id="descripcion"
											isRequired={true}
											onChange={(event) =>
												setDesc(
													event.currentTarget.value
												)
											}
										/>
									</Box>

									<Box width="100%">
										<FormLabel htmlFor="categoria">
											Categoria
										</FormLabel>
										<Select
											id="categoria"
											placeholder="Elige una categoria"
											onChange={(event) =>
												setCate(event.target.value)
											}
										>
											{categorias?.map((c, ind) => {
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

									<Box width="100%">
										<FormLabel>
											Elige las imagenes adjuntas
										</FormLabel>
										<Button position="absolute">
											Click me
										</Button>
										<Input
											id="imagenes"
											type="file"
											multiple
											width="100px"
											height="40px"
											accept={"image/*"}
											opacity={0}
											onChange={(event) => {
												setFiles(event.target.files);
											}}
										/>
									</Box>

									<Box width="100%">
										{files && <Text>Preview</Text>}
										{files && (
											<Imagenes>
												{getPrevs(files).map(
													(file, ind) => (
														<Imagen
															key={ind}
															URL={URL.createObjectURL(
																file
															)}
															func={filterPrev}
															args={[file, files]}
														/>
													)
												)}
											</Imagenes>
										)}
									</Box>

									<Box width="100%">
										{producto && (
											<Text>Imagenes existentes</Text>
										)}
										{producto && (
											<Imagenes>
												{newFiles?.map((img, ind) => {
													return (
														<Imagen
															key={ind}
															URL={img.imagen}
															func={
																filterExistent
															}
															args={[img]}
														/>
													);
												})}
											</Imagenes>
										)}
									</Box>
								</VStack>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} type="submit">
								{mode.split(" ")[0]}
							</Button>
							<Button
								variant="ghost"
								mr={3}
								onClick={() => {
									onClose();
									navigate(0);
								}}
							>
								Cancelar
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
