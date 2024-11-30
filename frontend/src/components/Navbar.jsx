import {
    Container,
    Flex,
    Text,
    HStack,
    Button,
    useColorMode,
    Avatar,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { SunIcon } from "@chakra-ui/icons";
import { BsBell, BsChat } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from '../store/user';

const NavbarPage = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const currentUser = useUserStore((state) => state.currentUser);
    const setCurrentUser = useUserStore((state) => state.setCurrentUser);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        localStorage.clear();
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <Container 
            maxW="100%" 
            px={4} 
            bgGradient={colorMode === "light" ? "linear(to-r, gray.800, blue.800, teal.500)" : "linear(to-r, gray.800, blue.800, teal.600)"} 
            color={colorMode === "light" ? "black" : "white"} 
            zIndex="10" 
            position="fixed" 
            top="0"
            boxShadow="md"
            transition="background 0.3s ease"
        >
            <Flex
                h={"50px"}
                alignItems={"center"}
                justifyContent={"space-between"}
                padding={"20px"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "20", sm: "24" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    bgGradient="linear(to-l, #36d1dc, #5b86e5)"
                    bgClip="text"
                >
                    <Link to="/">Dashboard 🖥️</Link>
                </Text>

                <HStack spacing={4} alignItems="center">
                    {/* Notifications Dropdown */}
                    <Menu>
                        <MenuButton as={Button} variant="ghost" aria-label="Notifications">
                            <BsBell color="inherit" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>No new notifications</MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Messages Dropdown */}
                    <Menu>
                        <MenuButton as={Button} variant="ghost" aria-label="Messages">
                            <BsChat color="inherit" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>No new messages</MenuItem>
                        </MenuList>
                    </Menu>

                    {/* Profile Avatar to open drawer */}
                    <Avatar size="sm" name={currentUser?.username || "User"} src="https://bit.ly/dan-abramov" onClick={onOpen} cursor="pointer" />

                    {/* Dark/Light Mode Toggle */}
                    <Button onClick={toggleColorMode} variant="ghost" aria-label="Toggle Color Mode">
                        {colorMode === "light" ? <IoMoon /> : <SunIcon />}
                    </Button>
                </HStack>
            </Flex>

            {/* Drawer for Profile Information */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Profile Information</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <Text fontSize="lg" fontWeight="bold">Username: {currentUser?.username}</Text>
                            <Text fontSize="md">Role: {currentUser?.role}</Text>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Container>
    );
};

export default NavbarPage;