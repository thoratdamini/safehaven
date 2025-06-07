import { Box, Typography, styled } from "@mui/material"; 
import { Delete } from "@mui/icons-material"; 
import { DataContext } from "../../../context/DataProvider"; 
import { useContext } from "react"; 

import { API } from "../../../../service/api"; 

// Styled component for comment container
const Component = styled(Box)`
  margin-top: 30px; /* Add top margin */
  background: #F5F5F5; /* Set background color */
  padding: 10px; /* Add padding */
  margin-right: -41px; /* Adjust right margin */
  margin-left: -41px; /* Adjust left margin */
  border-radius: 9px; /* Add border radius */
  border:solid 1px #EEEEEE; /* Add border */
  box-shadow: 0px 1px 0px 1px #EEEEEE; /* Add box shadow */

  &:hover {
    background: rgba(214, 214, 214, 0.75); /* Change background color on hover */
  }
}
`;

// Styled component for comment container
const Container = styled(Box)`
  display: flex; /* Use flexbox for layout */
  margin-bottom: 10px; /* Add bottom margin */
`;

// Styled component for commenter name
const Name = styled(Typography)`
  font-weight: 600; /* Set font weight */
  font-size: 16px; /* Set font size */
  margin-right: 20px; /* Add right margin */
  color: #878787; /* Set text color */
  margin-top: -7px; /* Adjust top margin */
  margin-left: 5px; /* Adjust left margin */
`;

// Styled component for comment date
const StyledDate = styled(Typography)`
  color: #878787; /* Set text color */
  font-size: 11px; /* Set font size */
  margin-top: -3px; /* Adjust top margin */
`;

// Styled component for delete icon
const DeleteIcon = styled(Delete)`
  margin-left: auto; /* Align to the right */
  color: red; /* Set icon color */
  cursor: pointer; /* Set cursor style */
`;

// Comment component
const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext); // Access account context

  // Function to remove a comment
  const removeComment = async () => {
    await API.deleteComment(comment._id); // Call API to delete comment
    setToggle((prev) => !prev); // Toggle state to trigger re-render
  };

  return (
    <Component>
      <Container>
        {/* Render commenter name */}
        <Name>{comment.name}</Name>
        {/* Render comment date */}
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {
          // Conditionally render delete button for comments based on user permissions
          (account.username === comment.name ||
            account.username === "admin") && (
            <DeleteIcon onClick={() => removeComment()} /> // Render delete button
          )
        }{" "}
      </Container>
      {/* Render comment text */}
      <Typography style={{ color: "#31363F" }}>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment; // Export Comment component
