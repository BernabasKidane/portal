import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Collapse,
  useDisclosure,
  Card,
  CardBody,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SecondPage = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const cardBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      color={textColor}
      p={8}
      display="flex"
      flexDirection="column"
      transition="all 0.3s ease-in-out"
      position="relative"
    >
      {/* Theme Toggle Icon */}
      <IconButton
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        position="fixed"
        top="20px"
        right="20px"
        aria-label="Toggle theme"
        bg="transparent"
        color={textColor}
        _hover={{ backgroundColor: "transparent", transform: "scale(1.1)" }}
        _focus={{ outline: "none" }}
        size="lg"
        zIndex="9999"  // Ensure it's above all other content
      />

      {/* Main Content Layout */}
      <HStack
        spacing={6}
        align="start"
        flexDirection={{ base: "column", md: "row" }}
        flex="1"
      >
        {/* Video Section */}
        <Box
          flex="1"
          w="full"
          bg={cardBgColor}
          borderRadius="md"
          p={4}
          boxShadow="md"
        >
          <Text mb={2} fontSize="lg" fontWeight="bold">
            Tutorial Video:
          </Text>
          <video
            controls
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              outline: "none",
            }}
          >
            <source src="/path-to-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* Content Section */}
        <VStack flex="1" spacing={4} align="stretch">
          {/* Big Info Card */}
          <Card bg={cardBgColor} boxShadow="lg" mb={4}>
            <CardBody>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                About Trade Ethiopia
              </Text>
              <Text>
                Trade Ethiopia is a leading company focused on the import and
                export of various agricultural products. We are dedicated to
                providing quality products while fostering strong trade relations
                within and outside of Ethiopia. Our mission is to support local
                farmers and promote sustainable practices in every step of the
                process.
              </Text>
            </CardBody>
          </Card>

          {/* Collapsible Detail Section */}
          <Box>
            <Button
              onClick={onToggle}
              variant="outline"
              colorScheme="purple"
              w="full"
              mb={2}
              _hover={{
                backgroundColor: "purple.500",
                color: "white",
                transform: "scale(1.05)",
              }}
            >
              {isOpen ? "Hide Details" : "Show Details"}
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <Box
                p={4}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="md"
              >
                <Text>
                  This section provides additional details about the company,
                  key points to remember, or other resources.
                </Text>
              </Box>
            </Collapse>
          </Box>

          {/* Cards with Content */}
          <HStack spacing={4} justify="space-between" w="full">
            <Box
              flex="1"
              p={4}
              bg={cardBgColor}
              borderRadius="md"
              textAlign="center"
              boxShadow="lg"
              _hover={{
                transform: "scale(1.05)",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Text fontSize="lg" fontWeight="bold">
                Card 1
              </Text>
              <Text>
                This is some content about Trade Ethiopia's products and services.
              </Text>
            </Box>
            <Box
              flex="1"
              p={4}
              bg={cardBgColor}
              borderRadius="md"
              textAlign="center"
              boxShadow="lg"
              _hover={{
                transform: "scale(1.05)",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Text fontSize="lg" fontWeight="bold">
                Card 2
              </Text>
              <Text>
                Learn more about our partnerships and how we ensure quality.
              </Text>
            </Box>
          </HStack>
        </VStack>
      </HStack>

      {/* Navigation Buttons */}
      <HStack justify="space-between" mt={6}>
        <Button
          colorScheme="purple"
          variant="outline"
          onClick={() => navigate(-1)}
          _hover={{ backgroundColor: "purple.500", color: "white" }}
        >
          Back
        </Button>
        <Button
          colorScheme="purple"
          onClick={() => navigate("/thirdpage")}
          _hover={{ backgroundColor: "purple.500", color: "white" }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default SecondPage;
