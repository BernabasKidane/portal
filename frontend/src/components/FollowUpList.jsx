import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner,
  Flex, Box, Text, Button, IconButton, useToast,
  FormControl, FormLabel, Input, Drawer, DrawerOverlay,
  DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  DrawerCloseButton, HStack, useColorModeValue,
  Select, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { FaPlus, FaEdit, FaSort, FaSortUp, FaSortDown, FaSync, FaEnvelope, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import CustomerFollowForm from './CustomerFollowForm';
import EditFollowUpForm from './EditFollowUpForm';

const FollowUpTable = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFollowUps, setFilteredFollowUps] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isContactDateModalOpen, setIsContactDateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterPhoneNumber, setFilterPhoneNumber] = useState('');
  const [filterDateOfCall, setFilterDateOfCall] = useState('');
  const [filterNote, setFilterNote] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [newNote, setNewNote] = useState('');
  const [lastContactDate, setLastContactDate] = useState('');
  const toast = useToast();

  const tableBgColor = useColorModeValue("white", "gray.800");
  const headerBgColor = "#2c3e50";
  const headerTextColor = "white";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/followup');
      setFollowUps(response.data);
      setFilteredFollowUps(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load follow-up data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this follow-up?")) {
      try {
        await axios.delete(`http://localhost:5000/api/followup/${customerId}`);
        setFollowUps((prev) => prev.filter((c) => c._id !== customerId));
        setFilteredFollowUps((prev) => prev.filter((c) => c._id !== customerId));
        toast({
          title: 'Deleted',
          description: 'Follow-up deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete follow-up.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterName, filterPhoneNumber, filterDateOfCall, filterNote, followUps, sortColumn, sortOrder]);

  const filterData = () => {
    let updatedData = [...followUps];

    if (filterName) {
      updatedData = updatedData.filter((item) =>
        item.fullName.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterPhoneNumber) {
      updatedData = updatedData.filter((item) =>
        item.phoneNumber.includes(filterPhoneNumber)
      );
    }
    if (filterDateOfCall) {
      updatedData = updatedData.filter((item) => {
        const followUpDate = new Date(item.followUpDate).toLocaleDateString();
        return followUpDate === new Date(filterDateOfCall).toLocaleDateString();
      });
    }
    if (filterNote) {
      updatedData = updatedData.filter((item) =>
        item.notes && item.notes.toLowerCase().includes(filterNote.toLowerCase())
      );
    }

    updatedData.sort((a, b) => {
      let comparison = 0;

      if (sortColumn === 'fullName') {
        comparison = a.fullName.localeCompare(b.fullName);
      } else if (sortColumn === 'followUpDate') {
        comparison = new Date(a.followUpDate) - new Date(b.followUpDate);
      } else if (sortColumn === 'status') {
        comparison = a.status.localeCompare(b.status);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredFollowUps(updatedData);
  };

  const handleSortChange = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleDetailsModalOpen = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
    setNewNote(customer.notes || '');
    setLastContactDate(customer.lastContactDate || '');
  };
  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedCustomer(null);
  };
  const handleEditModalOpen = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleNoteModalOpen = () => setIsNoteModalOpen(true);
  const handleNoteModalClose = () => setIsNoteModalOpen(false);

  const handleNoteChange = () => {
    if (selectedCustomer) {
      const updatedCustomer = { ...selectedCustomer, notes: newNote };
      setFollowUps((prev) =>
        prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c))
      );
      setFilteredFollowUps((prev) =>
        prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c))
      );
      toast({
        title: 'Success',
        description: 'Note updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleNoteModalClose();
    }
  };

  const handleContactDateChange = () => {
    if (selectedCustomer) {
      const updatedCustomer = { ...selectedCustomer, lastContactDate };
      setFollowUps((prev) =>
        prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c))
      );
      setFilteredFollowUps((prev) =>
        prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c))
      );
      toast({
        title: 'Success',
        description: 'Contact date updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleDetailsModalClose(); // Close modal after saving
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedData = filteredFollowUps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={[3, 5]} boxShadow="lg" borderWidth="1px" borderRadius="lg" bg={tableBgColor}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize={["xl", "2xl"]} fontWeight="bold" color="teal.600">Follow-Up Records</Text>
        <HStack spacing={2}>
          <IconButton
            aria-label="Add Follow-Up"
            icon={<FaPlus />}
            colorScheme="teal"
            onClick={handleDrawerOpen}
            size="lg"
            borderRadius="full"
          />
          <IconButton
            aria-label="Refresh Data"
            icon={<FaSync />}
            colorScheme="teal"
            onClick={fetchData}
            size="lg"
            borderRadius="full"
          />
          <Menu>
            <MenuButton as={Button} rightIcon={<FaSort />}>
              Sort By
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSortChange('fullName')}>Name</MenuItem>
              <MenuItem onClick={() => handleSortChange('followUpDate')}>Follow-Up Date</MenuItem>
              <MenuItem onClick={() => handleSortChange('status')}>Status</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Box mb={4} p={4} borderWidth="1px" borderRadius="lg" bg={tableBgColor}>
        <HStack spacing={4} mb={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Enter phone number"
              value={filterPhoneNumber}
              onChange={(e) => setFilterPhoneNumber(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date of Call</FormLabel>
            <Input
              type="date"
              value={filterDateOfCall}
              onChange={(e) => setFilterDateOfCall(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Note</FormLabel>
            <Input
              placeholder="Enter note"
              value={filterNote}
              onChange={(e) => setFilterNote(e.target.value)}
              width={["100%", "200px"]}
            />
          </FormControl>
        </HStack>
      </Box>

      <TableContainer>
        <Table variant="striped" colorScheme="teal" rounded="lg">
          <Thead>
            <Tr bg={headerBgColor}>
              <Th color={headerTextColor} onClick={() => handleSortChange('fullName')} cursor="pointer">
                Full Name {sortColumn === 'fullName' ? (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />) : null}
              </Th>
              <Th color={headerTextColor}>Email</Th>
              <Th color={headerTextColor}>Phone Number</Th>
              <Th color={headerTextColor} onClick={() => handleSortChange('followUpDate')} cursor="pointer">
                Follow-Up Date {sortColumn === 'followUpDate' ? (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />) : null}
              </Th>
              <Th color={headerTextColor} onClick={() => handleSortChange('status')} cursor="pointer">
                Status {sortColumn === 'status' ? (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />) : null}
              </Th>
              <Th color={headerTextColor}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((followUp) => (
              <Tr key={followUp._id}>
                <Td onClick={() => handleDetailsModalOpen(followUp)} cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  {followUp.fullName}
                </Td>
                <Td>
                  <Text 
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => window.location.href = `mailto:${followUp.email}`}
                  >
                    {followUp.email}
                  </Text>
                </Td>
                <Td>{followUp.phoneNumber}</Td>
                <Td>{new Date(followUp.followUpDate).toLocaleDateString()}</Td>
                <Td>{followUp.status}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    leftIcon={<FaEdit />}
                    onClick={() => handleEditModalOpen(followUp)}
                  >
                    Edit
                  </Button>
                  <IconButton
            aria-label="Delete Follow-Up"
            icon={<FaTrash />}
            colorScheme="red"
            size="sm"
            onClick={() => handleDelete(followUp._id)}
          />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="space-between" align="center" mt={4}>
        <FormControl width="auto">
          <FormLabel>Rows per page</FormLabel>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
        </FormControl>
        <Flex>
          {Array.from(
            { length: Math.ceil(filteredFollowUps.length / rowsPerPage) },
            (_, i) => (
              <Button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                variant={currentPage === i + 1 ? "solid" : "outline"}
                colorScheme="teal"
                mx={1}
              >
                {i + 1}
              </Button>
            )
          )}
        </Flex>
      </Flex>

      {/* Drawer for Adding Follow-Up */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Follow-Up</DrawerHeader>
          <DrawerBody>
            <CustomerFollowForm />
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="teal" onClick={handleDrawerClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Modal for User Details */}
      <Modal isOpen={isDetailsModalOpen} onClose={handleDetailsModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer ? (
              <>
                <Text fontWeight="bold">Full Name:</Text>
                <Text mb={4}>{selectedCustomer.fullName}</Text>
                <Text fontWeight="bold">Email:</Text>
                <Text mb={4}>
                  <Text 
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => window.location.href = `mailto:${selectedCustomer.email}`}
                  >
                    {selectedCustomer.email}
                  </Text>
                </Text>
                <Text fontWeight="bold">Phone Number:</Text>
                <Text mb={4}>{selectedCustomer.phoneNumber}</Text>
                <Text fontWeight="bold">Follow-Up Date:</Text>
                <Text mb={4}>{new Date(selectedCustomer.followUpDate).toLocaleDateString()}</Text>
                <Text fontWeight="bold">Notes:</Text>
                <Text>{selectedCustomer.notes || "No notes available."}</Text>
                {/* <Button colorScheme="teal" onClick={handleNoteModalOpen} mt={4}>
                  Edit Note
                </Button> */}
                {/* <Button colorScheme="teal" leftIcon={<FaCalendarAlt />} onClick={() => setIsContactDateModalOpen(true)} mt={4}>
                  Add Contact Date
                </Button> */}
              </>
            ) : (
              <Spinner />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleDetailsModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Editing Note */}
      <Modal isOpen={isNoteModalOpen} onClose={handleNoteModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Edit your note here"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleNoteChange}>
              Save Note
            </Button>
            <Button colorScheme="gray" onClick={handleNoteModalClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Adding Contact Date */}
      <Modal isOpen={isContactDateModalOpen} onClose={() => setIsContactDateModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Last Contact Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <Input
                type="date"
                value={lastContactDate}
                onChange={(e) => setLastContactDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleContactDateChange}>
              Save Contact Date
            </Button>
            <Button colorScheme="gray" onClick={() => setIsContactDateModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Editing Customer */}
      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Customer Follow-Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer ? (
              <EditFollowUpForm followUp={selectedCustomer} onClose={handleEditModalClose} />
            ) : (
              <Spinner />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleEditModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FollowUpTable;