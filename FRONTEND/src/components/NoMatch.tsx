import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NoMatch() {
    let navigate = useNavigate();
	return (
		<Box textAlign="center" py={10} px={6}>
			<Heading size="4xl">404</Heading>
			<Text fontSize="18px" mt={3} mb={2}>
				Page Not Found
			</Text>
			<Text color={"gray.500"} mb={6}>
                Uh Oh... Revisa tu URL
            </Text>

			<Button onClick={() => navigate('/')}> Mejor llevame a casa! </Button>
		</Box>
	);
}
