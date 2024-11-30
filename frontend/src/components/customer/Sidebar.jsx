import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPlusCircle,
  FiMenu,
  FiUsers,
  // FiBook,
  FiBookOpen,
} from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";

const SSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <Box
      as="nav"
      width={isCollapsed ? "70px" : "200px"}
      height="100vh"
      position="fixed" // Keeps it fixed to the viewport
      left={0}
      top={0}
      bg="#001f3f"
      color="white"
      transition="width 0.3s"
      zIndex="1000" // Ensures it's on top of all content
 
    >
      {/* Sidebar Header */}
      <Flex
        justify={isCollapsed ? "center" : "flex-start"}
        align="center"
        p={4}
      >
        {!isCollapsed && (
          <Text fontWeight="bold" fontSize="lg" color="white">
            Customer Service
          </Text>
        )}
      </Flex>

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
      <VStack align="start" spacing={4} p={2}>
        <SidebarLink
          isCollapsed={isCollapsed}
          to="/Cdashboard"
          icon={<FiHome />}
          label="Dashboard"
        />
        <SidebarLink
          isCollapsed={isCollapsed}
          to="/AddCustomer"
          icon={<FiPlusCircle />}
          label="Add Customer"
        />
        <SidebarLink
          isCollapsed={isCollapsed}
          to="/CustomerFollowup"
          icon={<FiUsers />}
          label="Follow Up"
        />
        <SidebarLink
          isCollapsed={isCollapsed}
          to="/training"
          icon={<FiBookOpen />}
          label="Training"
        />
         <SidebarLink
  isCollapsed={isCollapsed}
  to="/CResource"
  icon={<MdLibraryBooks />} // Library-like icon
  label="Resource"
/>
        {/* <SidebarLink
          isCollapsed={isCollapsed}
          to="/UploadPage"
          icon={<FiBook />}
          label="Upload Page"
        /> */}
      </VStack>
    </Box>
  );
};

/* Sidebar Link Component */
const SidebarLink = ({ isCollapsed, to, icon, label }) => (
  <Tooltip label={label} isDisabled={!isCollapsed} placement="right" hasArrow>
    <Link
      as={RouterLink}
      to={to}
      _hover={{ textDecoration: "none" }}
      aria-label={label}
    >
      <Flex
        align="center"
        p={2}
        borderRadius="md"
        _hover={{ bg: "#003366" }}
        transition="background-color 0.3s ease"
      >
        {icon}
        {!isCollapsed && (
          <Text ml={3} whiteSpace="nowrap" fontSize="14px">
            {label}
          </Text>
        )}
      </Flex>
    </Link>
  </Tooltip>
);

export default SSidebar;
