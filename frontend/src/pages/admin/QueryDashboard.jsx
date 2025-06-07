import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { API } from '../../../service/api';

const QueryDashboard = () => {
  const [queryList, setQueryList] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await API.getAllQueries();
        if (response.isSuccess) {
          setQueryList(response.data);
        } else {
          console.error('Error fetching queries:', response.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleOpenDialog = (query) => {
    setSelectedQuery(query);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedQuery(null);
    setOpenDialog(false);
  };

  const handleDeleteQuery = async () => {
    try {
      const response = await API.deleteQuery(selectedQuery._id);
      if (response.isSuccess) {
        // Remove the deleted query from the list
        const updatedQueryList = queryList.filter(query => query._id !== selectedQuery._id);
        setQueryList(updatedQueryList);
        setSelectedQuery(null); // Close the dialog after deletion
        setOpenDialog(false);
      } else {
        console.error('Error deleting query:', response.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Query Dashboard
      </Typography>
      {queryList.map(query => (
        <Card key={query._id} style={{ marginBottom: '1rem', cursor: 'pointer', 
        backgroundColor: "#222831", height: '250px',width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'
         }} onClick={() => handleOpenDialog(query)}>
          <CardContent>
            <Typography variant="h6" component="h2" color="white">
              {query.name}
            </Typography>
            <Typography variant="body2" color="white">
              Email: {query.email}
            </Typography>
            <Typography variant="body2" color="white">
              Country: {query.country}
            </Typography>
            <Typography variant="body2" color="white">
              Query: {query.query}
            </Typography>
            <Typography variant="body2" color="white" style={{ fontSize: '0.8rem', color: 'gray' }}>
              Created: {new Date(query.createdDate).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Query?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this query?</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#31363F",
              color: "white",
              "&:hover": { backgroundColor: "grey" },
            }}
            onClick={handleDeleteQuery}
            style={{ marginTop: '1rem' }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#76ABAE",
              color: "white",
              "&:hover": { backgroundColor: "grey" },
            }}
            style={{ marginTop: '1rem', marginLeft: '1rem' }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      {openDialog && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}></div>}
    </Container>
  );
};

export default QueryDashboard;
