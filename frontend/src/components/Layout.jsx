import Sidebar from "./Sidebar"; // Import Sidebar component
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box
        ml={{ base: 0, md: "250px" }} // This ensures content is pushed right if the sidebar is visible
        p={5}
        w="full"
        minHeight="100vh"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
