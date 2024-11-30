/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const CustomerFollowup = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // To store the selected client for the pop-out card
  const [note, setNote] = useState(""); // To store the new note
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [showUpdateCard, setShowUpdateCard] = useState(false); // Tracks if the update card is shown
  const [updatedServiceProvided, setUpdatedServiceProvided] = useState(""); // Tracks the value for the "Service Provided" input
  const [updatedServiceNotProvided, setUpdatedServiceNotProvided] = useState(""); // Tracks the value for the "Service Not Provided" input
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/followups");
      setData(response.data);
      setFilteredData(response.data); // Update filteredData when new data is fetched
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };
  
  // Add this function wherever it is called in your component
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.clientName.toLowerCase().includes(query) ||
        item.companyName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/followups");
        setData(response.data); // Populate table data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
  
    fetchData(); // Fetch initial data
  }, []);
  
  // Function to handle update and refresh table data
  // const handleUpdateServices = async (id, updatedServiceProvided, updatedServiceNotProvided) => {
  //   try {
  //     // Send the update request to the backend
  //     await axios.patch(`http://localhost:5000/api/followups/${id}/services`, {
  //       serviceProvided: updatedServiceProvided,
  //       serviceNotProvided: updatedServiceNotProvided,
  //     });
  
  //     // Re-fetch the data to update the table
  //     const response = await axios.get("http://localhost:5000/api/followups");
  //     setData(response.data);
  
  //     alert("Services updated successfully.");
  //   } catch (error) {
  //     console.error("Failed to update services:", error.message);
  //     alert("Failed to update services.");
  //   }
  // };
  
  
  // Function to handle update and refresh table data
  const handleUpdateServices = async (id, updatedServiceProvided, updatedServiceNotProvided) => {
    try {
      console.log("Preparing to send request:");
      console.log("ID:", id);
      console.log("Service Provided:", updatedServiceProvided);
      console.log("Service Not Provided:", updatedServiceNotProvided);
  
      // Use fallback values if the text areas are left empty
      const serviceProvided = updatedServiceProvided || selectedClient.serviceProvided || "";
      const serviceNotProvided = updatedServiceNotProvided || selectedClient.serviceNotProvided || "";
  
      const response = await axios.patch(`http://localhost:5000/api/followups/${id}/services`, {
        serviceProvided,
        serviceNotProvided,
      });
  
      console.log("Response:", response.data);
  
      // Re-fetch the data to update the table
      const dataResponse = await axios.get("http://localhost:5000/api/followups");
      setData(dataResponse.data);
  
      // Reset the card fields and close the card
      setUpdatedServiceProvided("");
      setUpdatedServiceNotProvided("");
      setShowUpdateCard(false);
  
      alert("Services updated successfully.");
    } catch (error) {
      console.error("Failed to update services:", error.message);
      alert("Failed to update services.");
    }
  };
   
  
  
  

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setNote(""); // Clear the note input when opening the card
  };

  const handleCloseCard = () => {
    setSelectedClient(null);
  };

  const handleAddNote = async () => {
    if (note.trim() === "") {
      alert("Please enter a note.");
      return;
    }
    try {
      // Sending a POST request to add the note for the selected client
      await axios.post(`http://localhost:5000/api/followups/${selectedClient._id}/notes`, { text: note });
      alert("Note added successfully.");
      setNote(""); // Clear the note after adding it
    } catch (err) {
      console.error(err);
      alert("Failed to add note.");
    }
  };

  const handleUpdateLastCalled = async () => {
    try {
      // Make the PATCH request to update `lastCalled`
      const response = await axios.patch(`http://localhost:5000/api/followups/${selectedClient._id}/lastCalled`);
      // Update the `lastCalled` value in the frontend state after success
      const updatedTime = response.data.lastCalled; // Assuming backend returns the updated document
      alert("Last called time updated successfully.");
      setSelectedClient((prev) => ({ ...prev, lastCalled: updatedTime }));
    } catch (err) {
      console.error(err);
      alert("Failed to update last called time.");
    }
  };

 const styles = {
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "40px",
      paddingLeft: "0px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      // backgroundColor: "#e0f7fa",
      color: "#333",
    },
    header: {
      fontSize: "4rem",
      color: "#333",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      borderRadius: "8px",
      overflow: "hidden", // Ensures the content doesn't overflow on smaller screens
    },
    th: {
      // backgroundColor: "#339",
      background: "linear-gradient(135deg, #1e3a8a, #000)",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
      fontSize: "16px",
      fontWeight: "bold",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
      fontSize: "14px",
      wordWrap: "break-word", // Wrap long words
      // backgroundColor: "#f9f9f9",
    },
    row: {
      backgroundColor: "#f9f9f9",
    },
    // rowHover: {
    //   backgroundColor: "#e0f7fa", // Light teal hover color for faded effect
    //   // color: "#333", // Dark text for visibility
    //   cursor: "pointer",
    // },
    error: {
      color: "red",
      fontSize: "1.2rem",
    },
    loading: {
      fontSize: "1.2rem",
      color: "#555",
    },
    card: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      zIndex: 1000,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    button: {
      marginTop: "10px",
      margin: "5px",
      padding: "10px 20px",
      backgroundColor: "#008080", // Blue-black button
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    closeButton: {
      backgroundColor: "#dc3545",
    },
    buttonHover: {
      backgroundColor: "#008080", // Teal hover color
      color: "#fff", // White text on hover
      cursor: "pointer",
    },
     refreshIcon: {
      fontSize: "1.5rem",
      color: "#666",
      padding: "5px",
      border: "10px solid #ddd",
      borderRadius: "0 8px 8px 0",
      cursor: "pointer",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      border: "1px solid #e0f7fa",
      borderRadius: "8px",
      padding: "5px",
      maxWidth: "400px",
      margin: "0 auto",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "1rem",
      padding: "5px",
    },
    searchIcon: {
      marginRight: "10px",
      fontSize: "1.5rem",
      color: "#666",
    },
    
      
  };



  return (
    // <Layout>
    <Layout maxW="1100px" mx="auto" py={2}>
      <Text fontSize="4xl" mb={6} textAlign="center">
        Customer Follow-up
      </Text>
      <Box mb={4} display="flex" justifyContent="center" gap={2}>
        <Input
          placeholder="Search by client or company name..."
          value={searchQuery}
          onChange={handleSearch}
          w="300px"
        />
        <Button onClick={fetchData} colorScheme="teal">
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : error ? (
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Client Name</Th>
              <Th>Company Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Package</Th>
              <Th>Service Provided</Th>
              <Th>Service Not Provided</Th>
              <Th>Deadline</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item._id}>
                <Td onClick={() => handleClientClick(item)} cursor="pointer">
                  {item.clientName}
                </Td>
                <Td>{item.companyName}</Td>
                <Td>{item.phoneNumber}</Td>
                <Td>{item.email}</Td>
                <Td>{item.packageType}</Td>
                <Td>{item.serviceProvided}</Td>
                <Td>{item.serviceNotProvided}</Td>
                <Td>{new Date(item.deadline).toLocaleDateString()}</Td>
                <Td>
                <button
  style={{ ...styles.button, padding: "5px 10px" }}
  onClick={() => {
    setSelectedClient(item); // Set the client
    setShowUpdateCard(true); // Show update card
  }}
>
  Update
</button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        // </Layout>
      )}

       {selectedClient && !showUpdateCard && (
  <>
    <div style={styles.overlay} onClick={handleCloseCard}></div>
    <div style={styles.card}>
      <h2>{selectedClient.clientName}</h2>
      <p>Package Type: {selectedClient.packageType}</p>
      <p>Last Called: {selectedClient.lastCalled ? new Date(selectedClient.lastCalled).toLocaleString() : "N/A"}</p>
      <p>Last Submitted Note:</p>
      {selectedClient.notes && selectedClient.notes.length > 0 ? (
        <>
          <p>{selectedClient.notes[selectedClient.notes.length - 1].text}</p>
          <button
            style={{ ...styles.button, marginTop: "10px" }}
            onClick={() => setShowAllNotes(true)} // Open all-notes card
          >
            View All Notes
          </button>
        </>
      ) : (
        <p>No notes available.</p>
      )}
      {showAllNotes && (
        <>
          <div style={styles.overlay} onClick={() => setShowAllNotes(false)}></div>
          <div style={styles.card}>
            <h3>All Notes</h3>
            <ul style={{ maxHeight: "200px", overflowY: "auto", padding: "10px" }}>
              {selectedClient.notes.map((note, index) => (
                <li key={index}>{note.text}</li>
              ))}
            </ul>
            <button
              style={{ ...styles.button, ...styles.closeButton }}
              onClick={() => setShowAllNotes(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
      <textarea
        placeholder="Add a note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="4"
        style={{ width: "100%", marginBottom: "10px", border: "5px" }}
      />
      <button style={styles.button} onClick={handleAddNote}>Add Note</button>
      <button style={{ ...styles.button, ...styles.closeButton }} onClick={handleUpdateLastCalled}>
        Update Last Called
      </button>
      <button style={{ ...styles.button, ...styles.closeButton }} onClick={handleCloseCard}>
        Close
      </button>
    </div>
  </>
)}

{showUpdateCard && (
  <>
    <div style={styles.overlay} onClick={() => setShowUpdateCard(false)}></div>
    <div style={styles.card}>
      <h3>Update Services for {selectedClient.clientName}</h3>
      <label>
        Service Provided:
        <textarea
          rows="3"
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          placeholder="Enter service provided"
          value={updatedServiceProvided || ""}
          onChange={(e) => setUpdatedServiceProvided(e.target.value)}
        />
      </label>
      <label>
        Service Not Provided:
        <textarea
          rows="3"
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          placeholder="Enter service not provided"
          value={updatedServiceNotProvided || ""}
          onChange={(e) => setUpdatedServiceNotProvided(e.target.value)}
        />
      </label>
      <button
        style={{ ...styles.button, marginTop: "10px" }}
        onClick={() =>
          handleUpdateServices(selectedClient._id, updatedServiceProvided, updatedServiceNotProvided)
        }
      >
        Update
      </button>
      <button
        style={{ ...styles.button, ...styles.closeButton }}
        onClick={() => {
          setShowUpdateCard(false); // Close the update card
          setSelectedClient(null); // Hide the selected client card
        }}
      >
        Close
      </button>
    </div>
  </>
)}


      </Layout>
    // </Layout>
  );
};

export default CustomerFollowup;
