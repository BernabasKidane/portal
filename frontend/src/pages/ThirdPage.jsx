import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useMediaQuery,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SecondPage from "./SecondPage";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState("page1");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [colorMode, setColorMode] = useState("light");
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarOpen(false);
    }
  }, [isSmallScreen]);

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const pages = {
    page1: {
      title: "Stoke-Market",
      description: "This is the description for the Stoke-Market page.",
      videoUrl: "https://www.youtube.com/embed/<your-video-id>",
      additionalDescription: "Here is some extra description about the Stoke-Market.",
      drawerContent: "More information about Stoke-Market...",
    },
    page2: {
      title: "Digital-Market",
      description: "This is the description for the Digital-Market page.",
      videoUrl: "https://www.youtube.com/embed/<your-video-id>",
      additionalDescription: "Here is some extra description about Digital-Market.",
      drawerContent: "More information about Digital-Market...",
    },
    page3: {
      title: "Import & Export",
      description: "This is the description for the Import & Export page.",
      videoUrl: "https://www.youtube.com/embed/<your-video-id>",
      additionalDescription: "Here is some extra description about Import & Export.",
      drawerContent: "More information about Import & Export...",
    },
  };

  const currentContent = pages[currentPage];

  return (
    <Box minH="100vh" display="flex" bg={colorMode === "light" ? "gray.50" : "gray.800"}>
      {/* Sidebar Toggle Button */}
      <Box position="fixed" top={4} left={4} zIndex="10">
        <IconButton
          icon={<HamburgerIcon />}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          bg="transparent"
          _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          p={3}
          aria-label="Toggle Navigation"
        />
      </Box>

      {/* Theme Toggle Icon */}
      <Box position="fixed" top={4} right={4} zIndex="10">
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          bg="transparent"
          _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          p={3}
          aria-label="Toggle Theme"
          color={colorMode === "light" ? "gray.800" : "whiteAlpha.800"}
        />
      </Box>

      {/* Sidebar Navigation */}
      <Flex
        as="nav"
        direction="column"
        bg={colorMode === "light" ? "white" : "gray.700"} // Sidebar background changes based on theme
        p={isSidebarOpen ? 8 : 2}
        w={isSidebarOpen ? "280px" : "5px"}
        minW={isSidebarOpen ? "180px" : "5px"}
        transition="width 0.3s"
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
        gap={6}
      >
        {isSidebarOpen && (
          <>
            {/* Sidebar Header */}
            <Heading
              size="lg"
              textAlign="center"
              fontSize="4xl"
              fontWeight="extrabold"
              bgGradient="linear(to-r, purple.500, pink.500)"
              bgClip="text"
              mt={8}
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.3)"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              TESSBINN
            </Heading>

            {/* Animated Line under Header */}
            <MotionBox
              height="2px"
              bg="purple.500"
              width="50%"
              mx="auto"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              mt={1}
            />

            {/* Navigation Buttons */}
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              colorScheme={currentPage === "page1" ? "purple" : "gray"}
              onClick={() => setCurrentPage("page1")}
              size="sm"
              boxShadow="md"
              variant="solid"
            >
              Stoke-Market
            </MotionButton>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              colorScheme={currentPage === "page2" ? "purple" : "gray"}
              onClick={() => setCurrentPage("page2")}
              size="sm"
              boxShadow="md"
              variant="solid"
            >
              Digital-Market
            </MotionButton>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              colorScheme={currentPage === "page3" ? "purple" : "gray"}
              onClick={() => setCurrentPage("page3")}
              size="sm"
              boxShadow="md"
              variant="solid"
            >
              Import & Export
            </MotionButton>
          </>
        )}
      </Flex>

      {/* Main Content */}
      <Box
        flex="1"
        bg={colorMode === "light" ? "white" : "gray.700"} // Main content background changes based on theme
        p={10}
        boxShadow="lg"
        ml={isSidebarOpen ? 8 : 0}
        mr={16}
        borderRadius="lg"
      >
        <VStack align="start" spacing={10}>
          <Heading size="xl" color={colorMode === "light" ? "purple.700" : "purple.300"}>
            {currentContent.title}
          </Heading>

          {/* Animated Line under Heading */}
          <MotionBox
            height="2px"
            bg="purple.500"
            width="50%"
            mx="auto"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            mt={1}
          />

          <Text fontSize="lg" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            {currentContent.description}
          </Text>

          <iframe
            width="100%"
            height="315"
            src={currentContent.videoUrl}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Additional Description Box */}
          <Box
            bg={colorMode === "light" ? "gray.100" : "gray.700"}
            p={6}
            borderRadius="md"
            shadow="md"
            w="100%"
          >
            <Text fontSize="lg" color={colorMode === "light" ? "gray.700" : "gray.200"}>
              {currentContent.additionalDescription}
            </Text>
          </Box>

          <Button
            colorScheme="teal"
            onClick={() => setIsDrawerOpen(true)}
            variant="solid"
          >
            More Info
          </Button>

          {/* Drawer for additional content */}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            size="md"
            placement="right"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>More Information</DrawerHeader>
              <DrawerBody>{currentContent.drawerContent}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </VStack>

                    {/* Navigation Buttons */}
      <HStack justify="space-between" mt={6}>
        <Button
          colorScheme="purple"
          variant="outline"
          onClick={() => navigate("/secondPage")}
          _hover={{ backgroundColor: "purple.500", color: "white" }}
        >
          Back
        </Button>
        <Button
          colorScheme="purple"
          onClick={() => navigate("/fourthpage")}
          _hover={{ backgroundColor: "purple.500", color: "white" }}
        >
          Next
        </Button>
      </HStack>


      </Box>
    </Box>
  );
};

export default Sidebar;
