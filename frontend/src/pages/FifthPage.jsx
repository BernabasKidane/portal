import React from "react";
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
  useColorMode,
  useColorModeValue,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const FifthPage = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  // Adjusted Colors for better visibility
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const sidebarBgColor = useColorModeValue("teal.600", "teal.800");
  const sidebarTextColor = useColorModeValue("white", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const tabHighlightColor = useColorModeValue("purple.400", "purple.600");

  const expoDetails = [
    {
      title: "Expo Overview",
      description: "Discover the innovative projects and opportunities showcased at the Ethio International Expo.",
    },
    {
      title: "Global Participation",
      description: "Exhibitors from multiple countries showcase innovations.",
    },
    {
      title: "Networking Opportunities",
      description: "Connect with industry leaders and potential partners.",
    },
    {
      title: "Cultural Exhibits",
      description: "Experience Ethiopia’s rich culture through exhibitions.",
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} color={textColor} position="relative">
      {/* Theme Toggle Icon */}
      <Box position="fixed" top={4} right={4} zIndex="10">
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          bg="transparent"
          _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          p={3}
          aria-label="Toggle Theme"
          color={textColor}
        />
      </Box>

      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        w="120px"
        bg={sidebarBgColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize="5xl"
          fontWeight="bold"
          color={sidebarTextColor}
          transform="rotate(-90deg)"
          textAlign="center"
          whiteSpace="nowrap"
        >
          Ethio-International Expo
        </Text>
      </Box>

      {/* Main Content */}
      <Container
        maxW="7xl"
        py={10}
        ml="140px" // Adjust for the sidebar width
      >
        {/* Video and Image Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          alignItems="center"
        >
          <Box
            bg={cardBgColor}
            borderRadius="lg"
            boxShadow="lg"
            p={6}
            color={cardTextColor}
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Learn More About Ethio-International Expo
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
              <source src="/path-to-ethio-expo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Image
            src="/path-to-image.jpg" // Replace with the actual image path
            alt="Ethio-International Expo"
            borderRadius="lg"
            boxShadow="lg"
            objectFit="cover"
            w="100%"
            h={{ base: "200px", md: "auto" }}
          />
        </Grid>

        {/* Highlights Section */}
        <Box w="full" mt={10}>
          <Tabs
            variant="soft-rounded"
            colorScheme="purple"
            defaultIndex={1}
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: tabHighlightColor }}>
                Overview
              </Tab>
              <Tab _selected={{ color: "white", bg: tabHighlightColor }}>
                Highlights
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Welcome to the Ethio-International Expo!
                  <Divider/>
                </Text>
                <Text>
                  This event is a melting pot of innovation, culture, and networking opportunities. 
                  Held annually in Ethiopia, the expo showcases cutting-edge technology, global partnerships, and unique cultural artifacts. 
                  Join us to discover:
                </Text>
                <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                  <li>- Innovative solutions in business and technology</li>
                  <li>- A platform for networking with global leaders</li>
                  <li>- An immersive experience into Ethiopia’s rich culture</li>
                </ul>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  {expoDetails.map((expo, index) => (
                    <GridItem key={index}>
                      <Card
                        bg={cardBgColor}
                        boxShadow="xl"
                        p={4}
                        color={cardTextColor}
                      >
                        <CardBody>
                          <Text fontSize="lg" fontWeight="bold" mb={2}>
                            {expo.title}
                          </Text>
                          <Text>{expo.description}</Text>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>

      {/* Footer */}
      <Box py={6} px={8} ml="140px">
        <HStack justify="space-between">
          <Button
            colorScheme="purple"
            variant="outline"
            onClick={() => navigate(-1)}
            _hover={{ backgroundColor: "purple.500", color: "white" }}
            leftIcon={<FaArrowLeft />}
          >
            Back
          </Button>
          <Button
            colorScheme="purple"s
            onClick={() => navigate("/exam")}
            _hover={{ backgroundColor: "purple.500", color: "white" }}
          >
            Finish
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default FifthPage;
