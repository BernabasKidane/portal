import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { FiHome, FiPlusCircle, FiMenu, FiUsers, FiBook, FiBookOpen, FiSearch } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <Box
      as="nav"
      width={isCollapsed ? "70px" : "250px"}
      height="100vh"
      position="fixed"
      left={0}
      top={0}
      bg="gray.800"
      color="white"
      transition="width 0.3s"
      zIndex="1"
      paddingTop="80px" // Adjusting to account for the Navbar height
    >
      {/* Collapse Toggle Button */}
      <Flex justify="flex-end" align="center" p={4}>
        <IconButton
          icon={<FiMenu />}
          variant="ghost"
          color="white"
          onClick={toggleCollapse}
          aria-label="Toggle Sidebar"
        />
      </Flex>

      {/* Sidebar Links */}
      <VStack align="start" spacing={4} p={4}>
        {/* Dashboard Link */}
        <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiHome />
            {!isCollapsed && <Text ml={3}>Dashboard</Text>}
          </Flex>
        </Link>

        {/* Create Link */}
        {/* <Link as={RouterLink} to="/create" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiPlusCircle />
            {!isCollapsed && <Text ml={3}>Create</Text>}
          </Flex>
        </Link> */}

        {/* Customer List Link */}
        <Link as={RouterLink} to="/FollowUpList" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiUsers />
            {!isCollapsed && <Text ml={3}>Customer List</Text>}
          </Flex>
        </Link>

        {/* Account Management Link */}
        <Link as={RouterLink} to="/users" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiUsers />
            {!isCollapsed && <Text ml={3}>Account Management</Text>}
          </Flex>
        </Link>

        {/* Quiz Center Link */}
        <Link as={RouterLink} to="/quiz" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiSearch />
            {!isCollapsed && <Text ml={3}>Quiz Center</Text>}
          </Flex>
        </Link>

        {/* Resources Link */}
        <Link as={RouterLink} to="/resources" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiBook />
            {!isCollapsed && <Text ml={3}>Resources</Text>}
          </Flex>
        </Link>

        {/* Add Resource Link */}
        <Link as={RouterLink} to="/FileUpload" _hover={{ textDecoration: "none" }}>
          <Flex align="center" p={2} borderRadius="md" _hover={{ bg: "gray.700" }}>
            <FiBookOpen />
            {!isCollapsed && <Text ml={3}>Others</Text>}
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
