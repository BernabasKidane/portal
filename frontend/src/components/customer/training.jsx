// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Flex,
  Text,
  // Box,
  useToast,IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import {FaSync} from 'react-icons/fa';
import Layout from "./Layout";

const Training = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/followup");
      // Filter the data to include only items with status "Complete"
      const filteredData = response.data.filter(
        (followUp) => followUp.status === "Complete"
      );
      setFollowUps(filteredData);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load follow-up data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
 

  return (
    <Layout p={[3, 5]} boxShadow="lg" borderWidth="1px" borderRadius="lg">
      <Flex justify="space-between" align="center" mb={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.600">
        Customer that takes Training this week
      </Text>
      <IconButton
            aria-label="Refresh Data"
            icon={<FaSync />}
            colorScheme="teal"
            onClick={fetchData}
            size="lg"
            borderRadius="full"
          />
          </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead bg={"blue.400"}>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Follow-Up Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {followUps.map((followUp) => (
              <Tr key={followUp._id}>
                <Td>{followUp.fullName}</Td>
                <Td>{followUp.email}</Td>
                <Td>{followUp.phoneNumber}</Td>
                <Td>
                  {new Date(followUp.followUpDate).toLocaleDateString()}
                </Td>
                <Td>{followUp.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Training;
