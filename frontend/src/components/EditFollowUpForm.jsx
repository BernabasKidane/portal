import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import axios from 'axios';

const EditFollowUpForm = ({ followUp, onClose }) => {
  const [formData, setFormData] = useState(followUp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/followup/${followUp._id}`, formData);
      onClose(); // Close the modal after successful edit
    } catch (error) {
      console.error('Error updating follow-up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Full Name</FormLabel>
        <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input name="email" value={formData.email} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Follow-Up Date</FormLabel>
        <Input type="date" name="followUpDate" value={formData.followUpDate.split('T')[0]} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Status</FormLabel>
        <Input name="status" value={formData.status} onChange={handleChange} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Notes</FormLabel>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} />
      </FormControl>
      <Button colorScheme="teal" type="submit">Save Changes</Button>
    </form>
  );
};

export default EditFollowUpForm;