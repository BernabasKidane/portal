// File: src/pages/WelcomePage.jsx

import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/assets/welcome video1.mp4" // Adjust the path if necessary
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0, // Lowest layer
        }}
      />

      {/* Dark Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.6)" // Dark overlay
        zIndex={1} // Above video, below content
      />

      {/* Content */}
      <Flex
  align="center"
  justify="center"
  direction="column"
  textAlign="center"
  height="100vh"
  color="white"
  px={6}
  zIndex={3} // Above overlay and icon button
  position="relative"
>
  {/* Animated Heading */}
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <Text
      fontSize={['4xl', '5xl', '6xl']}
      fontWeight="bold"
      lineHeight="short"
      letterSpacing="wider"
      mb={4}
      bgGradient="linear(to-r, blue.100, cyan.400, blue.400, teal.100)"
      bgClip="text"
      textShadow="2px 2px 8px rgba(0, 0, 0, 0.5)"
    >
      Welcome to Trade Ethiopia
    </Text>
    <Text
      fontSize={['lg', 'xl', '2xl']}
      mt={4}
      bgGradient="linear(to-r, teal.400, cyan.500, blue.700)"
      bgClip="text"
      
    >
      Experience a new way to connect and collaborate
    </Text>
  </motion.div>

  {/* Animated Button */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, duration: 0.8 }}
  >
    <Button
      mt={10}
      size="lg"
      variant="outline"
      borderWidth="1px"
      borderColor="teal.400"
      color="white"
      fontWeight="bold"
      textTransform="uppercase"
      bg="transparent"
      _hover={{
        bg: "rgba(0, 255, 255, 0.1)",
        boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.8)",
      }}
      _active={{
        bg: "rgba(0, 255, 255, 0.2)",
        boxShadow: "0 0 20px 5px rgba(0, 255, 255, 1)",
      }}
      _focus={{
        outline: "none",
      }}
      transition="all 0.3s ease-in-out"
      onClick={() => (window.location.href = '/login')}
    >
      Get Started
    </Button>
  </motion.div>
</Flex>



      {/* Theme Toggle Button */}
      <IconButton
        aria-label="Toggle Color Mode"
        icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
        position="absolute"
        top="20px"
        right="20px"
        colorScheme="teal"
        zIndex={2} // Below text and button
      />
    </Box>
  );
};

export default WelcomePage;
