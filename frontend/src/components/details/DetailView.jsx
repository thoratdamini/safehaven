import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, styled } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments"; 
import { API } from "../../../service/api"; 
import { message } from 'antd'; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Styled component for the main container
const Container = styled(Box)`
  margin: 5% auto; /* Set margin */
  max-width: 1000px; /* Set maximum width */
  background: #f0f2f5; /* Set background color */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add box shadow */
  padding: 55px; /* Add padding */
  min-height: 70vh; /* Set minimum height */
`;

// Styled component for the author information
const Author = styled(Typography)`
  color: #31363f; /* Set text color */
  font-size: 12px; /* Set font size */
`;

// Styled component for the heading
const Heading = styled(Typography)`
  font-size: 24px; /* Set font size */
  font-weight: 400; /* Set font weight */
  margin: 20px 0; /* Set margin */
  color: #31363f; /* Set text color */
`;

// Styled component for the description
const Description = styled(Typography)`
  font-size: 18px; /* Set font size */
  margin-bottom: 20px; /* Set bottom margin */
  color: #31363f; /* Set text color */
`;

// Styled component for the action buttons container
const ActionButtonsContainer = styled(Box)`
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space between items */
  align-items: center; /* Align items vertically */
  margin-top: 20px; /* Set top margin */
`;

// Styled component for the icon wrapper
const IconWrapper = styled(Box)`
  margin-right: 10px; /* Set right margin */
`;

// DetailView component
const DetailView = () => {
  const [post, setPost] = useState({}); // State for post
  const { id } = useParams(); // Get id parameter from URL
  const navigate = useNavigate(); // Use useNavigate hook to get the navigate function
  const { account } = useContext(DataContext); // Access account context

  // Fetch post data when component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id); // Call API to fetch post by id
      if (response.isSuccess) {
        setPost(response.data); // Set post state with fetched data
      }
    };
    fetchData(); // Call fetchData function
  }, [id]); // Trigger effect when id changes

  // Function to delete post
  const deletePost = async () => {
    let response = await API.deletePost(post._id); // Call API to delete post
    if (response.isSuccess) {
      if (account.username === "admin") {
        // If user is admin, navigate to admin section
        navigate("/admin", { state: { selectedSection: 'CommunityPost' } });
      } else {
        navigate("/"); // Otherwise, navigate to home page
        message.success("Post deleted Successfully", 0.7); // Show success message
      }
    }
  };

  return (
    <Box>
      {account.username === "admin" && (
  <Link
  to={{
    pathname: "/admin",
    state: { selectedSection: 'CommunityPost' }
  }}
    style={{
      position: "absolute",
      top: "20px", // Adjust top position for alignment
      left: "20px", // Adjust left position for alignment
      display: "flex", // Ensure flex display to align items
      alignItems: "center", // Align items vertically
      textDecoration: "none",
      color: "black",
      cursor: "pointer",
    }}
  >
    <ArrowBackIcon style={{ marginRight: "5px" }} /> Back
  </Link>
)}

      <Container>
        {/* Render author and date */}
        <Box display="flex" justifyContent="space-between">
          <Author>{`Created by ${post.username || "Unknown"}`}</Author>
          <Typography variant="body2">{new Date(post.createdDate).toDateString()}</Typography>
        </Box>
        <Box>
          <Heading>{post.title}</Heading> {/* Render post title */}
          <Description>{post.description}</Description> {/* Render post description */}
        </Box>
        {/* Render action buttons */}
        <ActionButtonsContainer>
          {(account.username === post.username || account.username === "admin") && (
            <>
              {/* Render the edit button if the username matches post.username or if the user is an admin */}
              {account.username !== "admin" && (
                <IconWrapper>
                  {/* Link to edit post */}
                  <Link to={`/update/${post._id}`}>
                    <EditIcon style={{ color: "#76ABAE" }} />
                  </Link>
                </IconWrapper>
              )}
              {/* Always render the delete button */}
              <IconWrapper>
                <DeleteIcon onClick={() => deletePost()} color="error" /> {/* Delete post on click */}
              </IconWrapper>
            </>
          )}
        </ActionButtonsContainer>
        
        <Box display="flex" justifyContent="center" alignItems="center" marginTop="20px" style={{ color: 'red' }}>
          {/* Render Comments component */}
          <Comments post={post} />
        </Box>
      </Container>
    </Box>
  );
};

export default DetailView; // Export DetailView component
