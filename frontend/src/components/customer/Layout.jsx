import React from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./customNavbar"; // Assuming you have a Navbar component

const Layout = ({ children }) => {
  const sidebarWidthCollapsed = "70px"; // Sidebar width when collapsed
  const sidebarWidthExpanded = "200px"; // Sidebar width when expanded
  const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Navbar */}
      <Box position="fixed" top={0} left={0} width="100%" zIndex="1000">
        <Navbar />
      </Box>

      {/* Main Container */}
      <Box display="flex" flex="1" pt="60px">
        {/* Sidebar */}
        <Box
          position="fixed"
          top="60px" // Adjust for navbar height
          left={0}
          width={isSidebarCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded} // Dynamic width based on collapsed state
          transition="width 0.3s" // Smooth transition for expanding/collapsing
          display={{ base: "none", md: "block" }} // Hide sidebar on mobile, show on medium and larger screens
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />
        </Box>

        {/* Main Content */}
        <Box
          ml={{
            base: 0, // No margin on mobile
            md: isSidebarCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded, // Adjust for collapsed or expanded sidebar on larger screens
          }}
          transition="margin-left 0.3s" // Smooth transition for content adjustment
          p={4}
          bg="#f8f9fa"
          flex="1" // Ensures content takes the remaining space
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
