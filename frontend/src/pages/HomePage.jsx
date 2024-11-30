import { 
    Container, 
    Text, 
    VStack, 
    SimpleGrid, 
    Spinner, 
    Alert, 
    AlertIcon, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    Select, 
    HStack, 
    Box, 
    IconButton, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    useDisclosure 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserStore } from '../store/user.js';
import UserCard from '../components/UserCard';
import { SearchIcon, AddIcon, RepeatIcon } from '@chakra-ui/icons'; // Import RepeatIcon
import CreatePage from './CreatePage';

const HomePage = () => {
    const { fetchUsers, users, loading, error } = useUserStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filter users based on the search term and selected role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole ? user.role === selectedRole : true;
        return matchesSearch && matchesRole;
    });

    // Function to handle refresh
    const handleRefresh = () => {
        fetchUsers();
    };

    return (
        <Container maxW='container.xl' py={12} px={4} mt={-16}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    List of User Accounts 📜
                </Text>

                {/* Box Container for Search and Role Filter */}
                <Box 
                    width="full" 
                    maxW="600px" 
                    bg="gray.50" 
                    p={5} 
                    borderRadius="md" 
                    boxShadow="md"
                >
                    <HStack spacing={4} alignItems="flex-start">
                        <InputGroup flex={1}>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>
                            <Input
                                type="text"
                                placeholder="Search by username or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="lg"
                                borderRadius="md"
                                focusBorderColor="blue.400"
                            />
                        </InputGroup>

                        <Select 
                            placeholder="Select role" 
                            onChange={(e) => setSelectedRole(e.target.value)} 
                            maxW="200px"
                        >
                            <option value="admin">Admin</option>
                            <option value="sales">Sales</option>
                            <option value="hr">HR</option>
                        </Select>

                        {/* Add User Icon Button beside the filtering elements */}
                        <HStack spacing={2}>
                            <IconButton 
                                aria-label="Add User" 
                                icon={<AddIcon />} 
                                colorScheme="teal" 
                                onClick={onOpen}
                                size="lg"
                                variant="outline"
                            />
                            {/* Refresh Icon Button */}
                            <IconButton 
                                aria-label="Refresh Users" 
                                icon={<RepeatIcon />} 
                                colorScheme="blue" 
                                onClick={handleRefresh}
                                size="lg"
                                variant="outline"
                            />
                        </HStack>
                    </HStack>
                </Box>

                {/* Drawer for Creating User */}
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader> </DrawerHeader>
                        <DrawerBody>
                            <CreatePage onClose={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                {/* Conditional Rendering based on loading, error, and filteredUsers */}
                {loading ? (
                    <Spinner size="xl" color="blue.500" />
                ) : error ? (
                    <Alert status="error" variant="left-accent">
                        <AlertIcon />
                        {error}
                    </Alert>
                ) : filteredUsers.length === 0 ? (
                    <Text fontSize="xl" textAlign={"center"} fontWeight='bold' color="gray.500">
                        No User found! 😢{" "}
                    </Text>
                ) : (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3
                        }}
                        spacing={10}
                        w={"full"}
                    >
                        {filteredUsers.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))}
                    </SimpleGrid>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;