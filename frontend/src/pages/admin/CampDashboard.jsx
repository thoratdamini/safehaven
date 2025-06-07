import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardContent, Typography, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import { API } from '../../../service/api';
import { message } from 'antd';

const CampDashboard = ({onCampCreated}) => {
  const [showForm, setShowForm] = useState(false);
  const [campDetails, setCampDetails] = useState({
    title: '',
    location: '',
    description: ''
  });
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await API.getCamp();
        if (response.isSuccess) {
          setCamps(response.data);
        } else {
          console.error('Error fetching camps:', response.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchCamps();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.createCamp(campDetails); // Create a new camp
      console.log('Create response:', response); // Log the response
      if (response.isSuccess) {
        // Refresh the list of camps after creating
        const updatedCamps = await API.getCamp();
        if (updatedCamps.isSuccess) {
          setCamps(updatedCamps.data);
          if (onCampCreated) {
            onCampCreated();
          }
        }
        // Reset form fields
        setCampDetails({
          title: '',
          location: '',
          description: ''
        });
        // Hide the form after submission
        message.success("Camps Created Successfully",0.8);
        setShowForm(false);
      } else {
        console.error('Error creating camp:', response.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDeleteCamp = async (campId) => {
    try {
      const response = await API.deleteCampsDetails(campId);
      if (response.isSuccess) {
        // Remove the deleted camp from the list
        const updatedCamps = camps.filter(camp => camp._id !== campId);
        setCamps(updatedCamps);
        setSelectedCamp(null); // Close the dialog after deletion
        setOpenDialog(false);
      } else {
        console.error('Error deleting camp:', response.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleOpenDialog = (camp) => {
    setSelectedCamp(camp);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCamp(null);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Camp Dashboard
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76ABAE",
            color: "white",
            "&:hover": { backgroundColor: "grey" },
          }}
          // color="primary"
          onClick={() => setShowForm(prevState => !prevState)} // Toggle form visibility
        >
          {showForm ? "Hide Form" : "Create a Camp"}
        </Button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={campDetails.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <Select
              fullWidth
              label="City"
              name="location"
              value={campDetails.location}
              onChange={handleInputChange}
              displayEmpty
              margin="normal"
            >
              <MenuItem value="">Select City</MenuItem>
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
            </Select>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={campDetails.description}
              onChange={handleInputChange}
              margin="normal"
              
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#31363F",
                color: "white",
                "&:hover": { backgroundColor: "grey" },
              }}
              style={{ marginTop: '1rem' }}
            >
              Create
            </Button>
          </form>
        )}
      </div>
      <Typography variant="h5" gutterBottom>
        All Camps
      </Typography>
      <div style={{display:'grid'}}>
      {camps.map(camp => (
        <Card key={camp._id} style={{ marginBottom: '1rem', cursor: 'pointer', 
          backgroundColor: "#222831", height: '250px',width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'
           }} onClick={() => handleOpenDialog(camp)}>
          <CardContent>
            <Typography variant="h6" component="h2" color="white">
              {camp.title}
            </Typography>
            <Typography variant="body2" color="white">
              Location: {camp.location}
            </Typography>
            <Typography variant="body2" color="white">
              Description: {camp.description}
            </Typography>
          </CardContent>
        </Card>
      ))}</div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedCamp && selectedCamp.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">Location: {selectedCamp && selectedCamp.location}</Typography>
          <Typography variant="body1">Description: {selectedCamp && selectedCamp.description}</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#31363F",
              color: "white",
              "&:hover": { backgroundColor: "grey" },
            }}
            onClick={() => handleDeleteCamp(selectedCamp._id)}
            style={{ marginTop: '1rem' }}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
      {openDialog && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}></div>}
    </Container>
  );
};

export default CampDashboard;
