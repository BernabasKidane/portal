import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get('http://localhost:5000/api/resources');
      setResources(response.data);
    };

    fetchResources();
  }, []);

  return (
    <Box>
      {resources.map(resource => (
        <Box key={resource._id} borderWidth={1} borderRadius="md" p={4} mb={2}>
          <Text fontWeight="bold">{resource.title}</Text>
          <Text>{resource.description}</Text>
          <Text>Type: {resource.fileType}</Text>
          <Text>Access Level: {resource.accessLevel}</Text>
          <Button as="a" href={`http://localhost:5000/${resource.filePath}`} download>
            Download
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ResourceList;