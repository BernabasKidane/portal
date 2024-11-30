import { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    packageType: "",
    serviceProvided: "",
    serviceNotProvided: "",
  });

  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the deadline (one year from today)
    const calculatedDeadline = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .split("T")[0];

    try {
      const response = await axios.post("http://localhost:5000/api/followups", {
        ...formData, // Include other form data
        deadline: calculatedDeadline, // Add the calculated deadline
      });

      if (response.status === 201) {
        setMessage("Customer added successfully!");
        setFormData({
          clientName: "",
          companyName: "",
          phoneNumber: "",
          email: "",
          packageType: "",
          serviceProvided: "",
          serviceNotProvided: "",
        });
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setMessage("Failed to add customer. Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #1e3a8a, #000)",
      color: "#f0f0f0",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
      fontFamily: "'Roboto', Arial, sans-serif",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#ffffff",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
    inputGroup: {
      flex: "1 1 calc(50% - 20px)", // Half-width with gap adjustment
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#d4d4d4",
    },
    input: {
      padding: "12px",
      marginBottom: "10px",
      border: "1px solid #3b82f6",
      borderRadius: "5px",
      background: "#111827",
      color: "#e0e0e0",
      outline: "none",
      fontSize: "1rem",
    },
    button: {
      padding: "12px",
      background: isHovered
        ? "linear-gradient(135deg, #2563eb, #1e40af)"
        : "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: "1rem",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
      boxShadow: isHovered
        ? "0px 6px 12px rgba(0, 0, 0, 0.4)"
        : "0px 4px 8px rgba(0, 0, 0, 0.2)",
      marginTop: "20px",
      width: "100%",
    },
    message: {
      marginTop: "20px",
      fontSize: "1rem",
      textAlign: "center",
      color: "#10b981",
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.header}>Add Customer</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="clientName">
              Client Name
            </label>
            <input
              style={styles.input}
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="companyName">
              Company Name
            </label>
            <input
              style={styles.input}
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              style={styles.input}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="packageType">
              Package Type
            </label>
            <input
              style={styles.input}
              type="text"
              id="packageType"
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="serviceProvided">
              Service Provided
            </label>
            <input
              style={styles.input}
              type="text"
              id="serviceProvided"
              name="serviceProvided"
              value={formData.serviceProvided}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="serviceNotProvided">
              Service Not Provided
            </label>
            <input
              style={styles.input}
              type="text"
              id="serviceNotProvided"
              name="serviceNotProvided"
              value={formData.serviceNotProvided}
              onChange={handleChange}
            />
          </div>
          <button
            style={styles.button}
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Add Customer
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </Layout>
  );
};

export default AddCustomer;
