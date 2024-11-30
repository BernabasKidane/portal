import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue } from '@chakra-ui/react';
import { FaUsers, FaUserPlus, FaUserCheck, FaTasks } from 'react-icons/fa';

const KpiCards = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [resources, setResources] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching counts from the backend
        const customerResponse = await fetch('http://localhost:5000/api/followup/count');
        const usersResponse = await fetch('http://localhost:5000/api/users/count');
        const resourcesResponse = await fetch('http://localhost:5000/api/resources/count');

        if (!customerResponse.ok || !usersResponse.ok || !resourcesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        // Parsing JSON responses
        const customerData = await customerResponse.json();
        const userData = await usersResponse.json();
        const resourceData = await resourcesResponse.json();

        console.log('Customer Count:', customerData);
        console.log('User Count:', userData);
        console.log('Resource Count:', resourceData);

        // Setting state with fetched counts
        setTotalCustomers(customerData.count); // Total customers
        setEmployees(userData.totalUsers); // Total employees
        setActiveEmployees(userData.activeUsers); // Active employees
        setResources(resourceData.count); // Total resources
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Placeholder while loading
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} p={4}>
      <StatCard title="Total Customers" value={totalCustomers} icon={FaUsers} bgColor={bgColor} />
      <StatCard title="Total Employees" value={employees} icon={FaUserPlus} bgColor={bgColor} />
      <StatCard title="Active Employees" value={activeEmployees} icon={FaUserCheck} bgColor={bgColor} />
      <StatCard title="Total Resources" value={resources} icon={FaTasks} bgColor={bgColor} />
    </SimpleGrid>
  );
};

const StatCard = ({ title, value, icon: Icon, bgColor }) => (
  <Box
    p={4}
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="sm"
    bg={bgColor}
    _hover={{ boxShadow: "md", transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
  >
    <Stat>
      <Box display="flex" alignItems="center" mb={2}>
        <Box as={Icon} color="blue.500" mr={2} boxSize={6} />
        <StatLabel fontWeight="medium">{title}</StatLabel>
      </Box>
      <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
      <StatHelpText color="green.500">Total count</StatHelpText> {/* Updated text */}
    </Stat>
  </Box>
);

export default KpiCards;