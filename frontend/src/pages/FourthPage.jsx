import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Card,
  CardBody,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Image
} from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FourthPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const {
    isOpen: isDrawerOpen,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const cardBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const packages = [
    { title: "Basic Package", description: "Access to fundamental courses and quizzes. Ideal for beginners." },
    { title: "Pro Package", description: "Includes advanced courses, live Q&A sessions, and mentorship programs." },
    { title: "Premium Package", description: "Full access to all resources, certifications, and one-on-one coaching." },
    { title: "Corporate Package", description: "Tailored courses and training for businesses and teams." },
    { title: "Student Package", description: "Affordable plans for students with full course access." },
    { title: "Expert Package", description: "Exclusive resources for industry experts and professionals." },
    { title: "Custom Package", description: "Create your own package with customizable course options." },
    { title: "Lifetime Package", description: "One-time payment for lifetime access to all courses." },
  ];

  const handleOpenModal = (pkg) => {
    setSelectedPackage(pkg);
    onOpenModal();
  };

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
        zIndex="9999"
      />

{/* Header Section */}
<VStack spacing={4} align="left" mb={8}>
  <HStack spacing={4} align="center">
    {/* Logo Section */}
    <Image
      src="/path-to-your-logo.png"  // Replace with your logo file path
      alt="Insera Logo"
      boxSize="50px"  // Adjust the size of the logo
    />

    {/* Text Section */}
    <Text fontSize="4xl" fontWeight="bold" textAlign="left">
      Insera.com
    </Text>
  </HStack>
  
  {/* Divider with glowing border effect */}
  <Divider
    borderColor="purple.500"
    borderWidth={2}
    borderStyle="solid"
    borderImage="linear-gradient(to right, #00B5B5, #8A2BE2) 1"
  />
</VStack>


{/* Main Content Layout */}
<HStack spacing={6} align="start" flexDirection={{ base: "column", md: "row" }} flex="1">
  {/* Video Section */}
  <Box flex="1" w="full" bg={cardBgColor} borderRadius="md" p={4} boxShadow="md">
    <Text mb={2} fontSize="lg" fontWeight="bold">
      Learn More About Us
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

    {/* "Page Summary" Button under the Video */}
    <Box mt={4} textAlign="center">
    <Button
  colorScheme="purple"
  bg="transparent"
  borderWidth="1px"
  borderColor="purple.500"
  color="purple.500"
  fontWeight="bold"
  _hover={{
    bg: "transparent",
    color: "white",
    borderColor: "purple.700",
    transform: "scale(1.1)", // Adds a scaling effect
    boxShadow: "0 0 10px 0 0 10px rgba(0, 181, 181, 0.8), 0 0 20px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 181, 181, 0.4)", // Adds a glowing effect
    transition: "all 0.3s ease", // Smooth transition for all properties
  }}
  _active={{
    transform: "scale(1.05)", // Slightly scale down when clicked
    boxShadow: "0 0 15px 0 0 10px rgba(0, 181, 181, 0.8), 0 0 20px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 181, 181, 0.4)", // Intensify glow on click
  }}
  width="auto"
  p={4} // Padding to make the button look better
  onClick={onOpenDrawer} // Add this line to trigger the drawer opening
>
  Summary
</Button>


    </Box>
  </Box>

  {/* Packages Section */}
  <Box flex="1" w="full">
    {/* Packages Section */}
    <Box flex="1" w="full" textAlign="center">
  <Text fontSize="2xl" fontWeight="bold" mb={4}>
    Our Packages
  </Text>

  {/* Wave Animation */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    className="wave-animation"
    style={{ width: '100%', height: '50px', marginTop: '-27px' }}
  >
    <path
      fill="purple"
      fillOpacity="0.5"
      d="M0,288L1440,192L1440,320L0,320Z"
      className="wave-path"
    />
  </svg>

  <style jsx>{`
    .wave-animation {
      animation: wave-animation 4s ease-in-out infinite;
    }

    @keyframes wave-animation {
      0% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(30px);
      }
      100% {
        transform: translateX(0);
      }
    }
  `}</style>
</Box>

<Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
  {packages.map((pkg, index) => (
    <GridItem key={index}>
<Card
  bg={cardBgColor}
  boxShadow="lg"
  h="full"
  borderWidth="1px"
  borderStyle="solid"
  borderImage="linear-gradient(to right, #00B5B5, #8A2BE2) 1"
  _hover={{
    borderImage: "linear-gradient(to right, #00B5B5, #8A2BE2) 1", // Darker cyan and purple gradient on hover
    boxShadow: "0 0 10px rgba(0, 181, 181, 0.3), 0 0 20px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 181, 181, 0.4)",  // Glowing neon cyan and purple effect
    transform: "scale(1.05)", // Slight scaling on hover
    transition: "all 0.3s ease", // Smooth transition for hover effect
  }}
  _focus={{
    borderImage: "linear-gradient(to right, #00B5B5, #8A2BE2) 1", // Focus on the same darker neon gradient
    boxShadow: "0 0 10px rgba(0, 181, 181, 0.3), 0 0 20px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 181, 181, 0.4)", // Glow effect on focus
  }}

>
  <CardBody>
    <Text
      fontSize="lg"
      fontWeight="bold"
      mb={2}
      cursor="pointer"
      _hover={{ color: "teal.500" }}
      onClick={() => handleOpenModal(pkg)}
    >
      {pkg.title}
    </Text>
    <Text noOfLines={2}>{pkg.description}</Text>
  </CardBody>
</Card>

    </GridItem>
  ))}
</Grid>

  </Box>
</HStack>


      {/* Modal for Package Details */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPackage?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedPackage?.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

{/* Drawer for Page Summary */}
<Drawer isOpen={isDrawerOpen} placement="right" onClose={onCloseDrawer} size="lg">
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Page Summary</DrawerHeader>
    <DrawerBody>
      <Text>
        This page introduces our platform and its offerings. Watch the video to learn more about us,
        and explore the packages designed to cater to different needs and goals.
      </Text>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" mr={3} onClick={onCloseDrawer}>
        Close
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>


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
          onClick={() => navigate("/fifthpage")}
          _hover={{ backgroundColor: "purple.500", color: "white" }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default FourthPage;
