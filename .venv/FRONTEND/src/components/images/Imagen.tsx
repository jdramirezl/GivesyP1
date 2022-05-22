import {
	Box,
	Center,
	Image,
	StackProps,
	Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface Props {
	URL: string;
	func?: Function;
	args?: any;
	size?: number[];
	rootProps?: StackProps;
}

export const Imagen = (props: Props) => {
	const { URL, args } = props;

	const onClick = () => {
		if (props.func) props.func(...args);
	};

	return (
		<Center py={12}>
			<Box rounded={"lg"} mt={-10} pos={"relative"} height={"100px"}>
				{props.func && (
					<Flex
						justifyContent="flex-end"
						position="absolute"
						left="70px"
					>
						<IconButton
							aria-label="Delete Image"
							variant="solid"
							size="sm"
							colorScheme="red"
							onClick={onClick}
							icon={<DeleteIcon />}
						/>
						
					</Flex>
				)}
				<Image
					rounded={"lg"}
					height={props.size ? props.size[0] : 100}
					width={props.size ? props.size[1] : 100}
					objectFit={"cover"}
					src={URL}
				/>
			</Box>
		</Center>
	);
};
