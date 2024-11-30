import { Input, VStack, Box, Container, Heading, Button, useColorModeValue, useToast, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateOrUpdatePage = ({ userId }) => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const toast = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                    const userData = response.data.user;
                    setNewUser({
                        name: userData.username,
                        email: userData.email,
                        password: "", // Don't pre-fill password for security reasons
                        role: userData.role,
                    });
                } catch (error) {
                    toast({
                        title: "Error fetching user data.",
                        description: error.response?.data?.message || "An error occurred.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
        };

        fetchUserData();
    }, [userId, toast]);

    const handleSubmit = async () => {
        try {
            const url = userId ? `http://localhost:5000/api/users/${userId}` : 'http://localhost:5000/api/users';
            const method = userId ? 'put' : 'post';
    
            // Set the default status based on the selected role
            let status = "inactive"; // Default status
            if (newUser.role === "admin" || newUser.role === "HR") {
                status = "active"; // Set to active for admin or HR roles
            }
    
            const dataToSend = {
                username: newUser.name,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role || "sales", // Ensure role is included
                status: status, // Include status in data being sent
            };
    
            console.log("Data being sent:", dataToSend); // Log the data being sent
    
            const response = await axios[method](url, dataToSend);
            
            if (response.data.success) {
                toast({
                    title: userId ? "User updated." : "User created.",
                    description: userId ? "The user has been updated successfully." : "The user has been created successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setNewUser({ name: "", email: "", password: "", role: "" });
            }
        } catch (error) {
            toast({
                title: userId ? "User update failed." : "User creation failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    {userId ? "Update Account" : "Create Account"}
                </Heading>
                <Box
                    w="full"
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Username"
                            name="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <Input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <Select
                            placeholder="Select Role"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="admin">Admin</option>
                            <option value="sales">Sales</option>
                            <option value="customerservice">Customer Service</option>
                            <option value="HR">HR</option>
                            <option value="sales supervisor">Sales Supervisor</option>
                        </Select>
                        <Button colorScheme="blue" onClick={handleSubmit} w="full">
                            {userId ? "Update User" : "Add User"}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreateOrUpdatePage;