import React, { useState, useEffect } from 'react';
import { 
    Input, VStack, Box, Container, Heading, Button, useColorModeValue, useToast, 
    HStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Collapse, IconButton, 
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const CreatePage = () => {
    const [newQuiz, setNewQuiz] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
    });
    const [quizzes, setQuizzes] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // Track the expanded question index
    const [editingQuizId, setEditingQuizId] = useState(null); // Track the quiz being edited
    const toast = useToast();

    // Chakra UI hook for controlling the drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Move `useColorModeValue` hook to the top of the component (outside callback functions)
    const tableBgColor = useColorModeValue("gray.50", "gray.700"); // Use in the table collapse
    const boxBgColor = useColorModeValue("white", "gray.800"); // Background color for quiz form

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/quiz');
            setQuizzes(response.data.data); // Use response.data.data as per your request
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuiz.options];
        updatedOptions[index] = value;
        setNewQuiz({ ...newQuiz, options: updatedOptions });
    };

    const handleAddQuiz = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/quiz', {
                question: newQuiz.question,
                options: newQuiz.options,
                correctAnswer: newQuiz.correctAnswer,
            });

            if (response.data.success) {
                toast({
                    title: "Quiz created.",
                    description: "The quiz has been created successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setNewQuiz({ question: "", options: ["", "", "", ""], correctAnswer: "" });
                fetchQuizzes(); // Fetch quizzes again to reflect the new quiz
                onClose(); // Close the drawer after quiz creation
            }
        } catch (error) {
            toast({
                title: "Quiz creation failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleUpdateQuiz = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/quiz/${editingQuizId}`, {
                question: newQuiz.question,
                options: newQuiz.options,
                correctAnswer: newQuiz.correctAnswer,
            });

            if (response.data.success) {
                toast({
                    title: "Quiz updated.",
                    description: "The quiz has been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setNewQuiz({ question: "", options: ["", "", "", ""], correctAnswer: "" });
                setEditingQuizId(null); // Reset editing state
                fetchQuizzes(); // Fetch quizzes again to reflect the updated quiz
                onClose(); // Close the drawer after quiz update
            }
        } catch (error) {
            toast({
                title: "Quiz update failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/quiz/${quizId}`);
            
            if (response.data.success) {
                toast({
                    title: "Quiz deleted.",
                    description: "The quiz has been deleted successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Remove the deleted quiz from the state
                setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
            }
        } catch (error) {
            toast({
                title: "Quiz deletion failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle between expanded and collapsed
    };

    const handleEditQuiz = (quiz) => {
        setNewQuiz({
            question: quiz.question,
            options: quiz.options,
            correctAnswer: quiz.correctAnswer,
        });
        setEditingQuizId(quiz._id); // Set the quiz ID for updating
        onOpen(); // Open the drawer to allow editing
    };

    return (
        <Container maxW="container.xl" py={8}>
            <HStack align="start" spacing={8} direction={["column", "column", "row"]}>
                {/* Quiz List Box - Set width to full and add padding */}
                <Box
                    w={{ base: "full", md: "70%" }} // Make box width responsive: Full on small, 70% on medium and larger screens
                    bg={boxBgColor} // Use the color defined by useColorModeValue
                    p={{ base: 4, md: 6 }} // Add responsive padding based on screen size
                    rounded="lg"
                    shadow="md"
                    overflowY="auto"
                    maxH="500px" // Make the list scrollable if it exceeds max height
                >
                    <Heading as="h2" size="lg" mb={4}>
                        Quiz List
                    </Heading>
                    <TableContainer>
                        <Table variant="simple" colorScheme="gray">
                            <Thead>
                                <Tr>
                                    <Th>Question</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {quizzes.length > 0 ? (
                                    quizzes.map((quiz, index) => (
                                        <React.Fragment key={quiz._id}>
                                            <Tr>
                                                <Td maxW="200px" isTruncated>{quiz.question}</Td>
                                                <Td textAlign="right">
                                                    <HStack spacing={2}>
                                                        <IconButton
                                                            aria-label="Expand/Collapse"
                                                            icon={expandedIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                                            onClick={() => toggleExpand(index)}
                                                            variant="ghost"
                                                        />
                                                        <IconButton
                                                            aria-label="Edit Quiz"
                                                            icon={<EditIcon />}
                                                            onClick={() => handleEditQuiz(quiz)}
                                                            variant="ghost"
                                                            color="blue.500"
                                                        />
                                                        <IconButton
                                                            aria-label="Delete Quiz"
                                                            icon={<DeleteIcon />}
                                                            onClick={() => handleDeleteQuiz(quiz._id)}
                                                            variant="ghost"
                                                            color="red.500"
                                                        />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td colSpan="2" p={0}>
                                                    <Collapse in={expandedIndex === index}>
                                                        <Box p={4} bg={tableBgColor} rounded="md">
                                                            <Text fontWeight="bold">Options:</Text>
                                                            <VStack align="start" spacing={1}>
                                                                {quiz.options.map((option, idx) => (
                                                                    <Text key={idx}>{`${idx + 1}. ${option}`}</Text>
                                                                ))}
                                                            </VStack>
                                                            <Text fontWeight="bold" mt={2}>Correct Answer: {quiz.correctAnswer}</Text>
                                                        </Box>
                                                    </Collapse>
                                                </Td>
                                            </Tr>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan="2" textAlign="center">No quizzes available.</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Create Quiz Button */}
                <Button colorScheme="teal" onClick={onOpen} alignSelf="flex-start" mb={4}>
                    Create New Quiz
                </Button>
            </HStack>

            {/* Drawer for Quiz Form (Edit / Create) */}
            <Drawer isOpen={isOpen} onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{editingQuizId ? "Edit Quiz" : "Create Quiz"}</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Enter question"
                                value={newQuiz.question}
                                onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                            />
                            {newQuiz.options.map((option, idx) => (
                                <Input
                                    key={idx}
                                    placeholder={`Option ${idx + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                                />
                            ))}
                            <Input
                                placeholder="Correct Answer"
                                value={newQuiz.correctAnswer}
                                onChange={(e) => setNewQuiz({ ...newQuiz, correctAnswer: e.target.value })}
                            />
                            <Button
                                colorScheme="teal"
                                onClick={editingQuizId ? handleUpdateQuiz : handleAddQuiz}
                            >
                                {editingQuizId ? "Update Quiz" : "Add Quiz"}
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Container>
    );
};

export default CreatePage;
