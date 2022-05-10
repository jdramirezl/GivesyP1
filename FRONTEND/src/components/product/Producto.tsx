import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    StackProps,
} from '@chakra-ui/react';
import { FetchAll } from '../../utils/RestFactory'
import {ProductoModel, ImagenModel, UserModel} from '../../models/Models';

interface Props {
    producto: ProductoModel
    rootProps?: StackProps
    imagenes: ImagenModel[]
}

export const Producto = (props: Props) => {
    const { producto, rootProps, imagenes } = props;
    const users = FetchAll<UserModel>('user')
    const seller = users?.filter(u => u.id == producto.vendedor)[0];
    
    return (
        <Center py={12}>
        <Box
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                filter: 'blur(15px)',
                zIndex: -1,
            }}
            _groupHover={{
                _after: {
                filter: 'blur(20px)',
                },
            }}>
            <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={imagenes[0]?.imagen}
            />
            </Box>
            <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                {seller?.first_name + " " + seller?.last_name}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {producto.titulo}
            </Heading>
            <Stack direction={'row'} align={'center'}>
                <Text fontWeight={800} fontSize={'xl'}>
                BUTTON
                </Text>
            </Stack>
            </Stack>
        </Box>
        </Center>
    );
}
