import { Box, Heading, HStack, IconButton, Text, useColorModeValue, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Input, Select } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useUserStore } from '../store/user';
import { useState, useEffect } from 'react';

const UserCard = ({ user }) => {
    const [updatedUser, setUpdatedUser] = useState(user); // Initialize with the user prop
    const [showPassword, setShowPassword] = useState(false);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteUser, updateUser, fetchUsers } = useUserStore(); // Ensure fetchUsers is available to refresh data
    const toast = useToast();

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    // Update `updatedUser` when the edit modal opens
    useEffect(() => {
        if (isEditOpen) {
            setUpdatedUser(user);
        }
    }, [isEditOpen, user]);

    const handleDeleteUser = async (uid) => {
        const { success, message } = await deleteUser(uid);
        toast({
            title: success ? 'Success' : 'Error',
            description: message,
            status: success ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
        });
        if (success) onDeleteClose();
        // Refresh user data after deletion
        await fetchUsers();
    };

    const handleUpdateUser = async () => {
        const { success } = await updateUser(user._id, updatedUser);
        toast({
            title: success ? 'Success' : 'Error',
            description: success ? "User updated successfully" : "Failed to update user",
            status: success ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
        });

        if (success) onEditClose();
        // Refresh user data after update
        await fetchUsers();
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            w="100%"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {user.username || "No Username Available"}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    {user.email || "No Email Available"}
                </Text>
                <Text fontSize="lg" color={textColor} mb={4}>
                    Role: {user.role || "No Role Assigned"}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme="blue" aria-label="Edit user" />
                    <IconButton icon={<DeleteIcon />} onClick={onDeleteOpen} colorScheme="red" aria-label="Delete user" />
                </HStack>
            </Box>

            {/* Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="User Name"
                                name="username"
                                value={updatedUser.username || ''} // Display the current username
                                onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                            />
                            <Input
                                placeholder="User Email"
                                name="email"
                                value={updatedUser.email || ''}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            />
                            <Box position="relative" width="100%">
                                <Input
                                    placeholder="User Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={updatedUser.password || ''}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                                />
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    onClick={() => setShowPassword(!showPassword)}
                                    position="absolute"
                                    right="10px"
                                    top="50%"
                                    transform="translateY(-50%)"
                                />
                            </Box>
                            <Select
                                placeholder="Select Role"
                                value={updatedUser.role || ''}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                            >
                                <option value="admin">Admin</option>
                                <option value="sales">Sales</option>
                                <option value="customerservice">Customer Service</option>
                                <option value="HR">HR</option>
                                <option value="sales supervisor">Sales Supervisor</option>
                            </Select>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateUser}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onEditClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete the user {user.username}?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={() => handleDeleteUser(user._id)}>
                            Yes, Delete
                        </Button>
                        <Button variant="ghost" onClick={onDeleteClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UserCard;
