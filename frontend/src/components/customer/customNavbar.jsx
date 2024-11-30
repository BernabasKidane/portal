// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  HStack,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  // useColorMode,
  // useDisclosure,
  MenuDivider,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle,} from 'react-icons/fa';
// import NotesDrawer from '../sales/NoteDrawer';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router-dom';

const Cnavbar = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Get user data from Zustand store
  const currentUser = useUserStore((state) => state.currentUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userStatus');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Gradient background
  const gradientBg = 'linear(to-r, #001f3f, blue.900, blue.700)';

  return (
    
    <Box
      bgGradient={gradientBg}
      px={4}
      py={2}
      shadow="md"
      transition="background 0.2s ease"
      zIndex="1000" // Added zIndex to ensure it appears above other components
      position="relative" // Use relative or fixed positioning if needed
    >
      <Flex alignItems="center">
        {/* Customer Service Text */}
        <Text
          fontWeight="bold"
          fontSize="lg"
          color="white"
          ml={2}
        >
          Customer Service
        </Text>

        <Spacer />

        {/* Icons and Profile */}
        <HStack spacing={4}>
          <IconButton
            icon={<FaBell />}
            aria-label="Notifications"
            variant="ghost"
            color="white"
          />
          {/* <IconButton
            icon={<FaStickyNote />}
            aria-label="Notes"
            variant="ghost"
            color="white"
            onClick={onOpen}
          /> */}
          {/* <IconButton
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            aria-label="Toggle Theme"
            variant="ghost"
            color="white"
            onClick={toggleColorMode}
          /> */}
          <Menu>
            <MenuButton>
              <Avatar
                name={currentUser?.username || 'User'}
                size="sm"
                bg="teal.300"
                icon={<FaUserCircle fontSize="20px" />}
              />
            </MenuButton>
            <MenuList>
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {currentUser?.username || 'User'}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {currentUser?.role || 'Role not available'}
                </Text>
              </Box>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
      {/* <NotesDrawer isOpen={isOpen} onClose={onClose} /> */}
    </Box>
  );
};

export default Cnavbar;
