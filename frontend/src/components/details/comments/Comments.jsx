import { Box, TextareaAutosize, Button, styled } from "@mui/material"; 
import PersonIcon from "@mui/icons-material/Person"; 
import { useState, useContext ,useEffect} from "react"; 
import { DataContext } from "../../../context/DataProvider"; 
import { API } from "../../../../service/api"; 
import Comment from "./Comment"; 

// Styled component for the main container
const Container = styled(Box)`
  margin-top: 20px; /* Add top margin */
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Set flex direction to column */
`;

// Styled component for the description container
const DescriptionContainer = styled(Box)`
  margin-bottom: 20px; /* Add bottom margin */
`;

// Styled component for the comment input container
const CommentInputContainer = styled(Box)`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Align items to center */
`;

// Styled component for the person icon
const Icon = styled(PersonIcon)`
  width: 30px; /* Set icon width */
  height: 30px; /* Set icon height */
  border-radius: 50%; /* Make icon circular */
  color: black; /* Set icon color */
`;

// Styled component for the textarea
const StyledTextArea = styled(TextareaAutosize)`
  flex: 1; /* Take remaining width */
  height: auto; /* Allow the textarea to expand */
  width: 300px; /* Set a fixed width */
  min-height: 50px; /* Set a minimum height */
  margin: 0 20px; /* Add margin */
  background-color: #EEEEEE; /* Set background color */
  border-radius: 7px; /* Add border radius */
  color: black; /* Set text color */
  padding: 7px; /* Add padding */
  resize: vertical; /* Allow vertical resizing */
`;

// Styled component for the comments container
const CommentsContainer = styled(Box)`
  width: 100%; /* Set width to 100% */
  background: white; /* Set background color */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add box shadow */
  padding: 55px; /* Add padding */
  margin-top: 5%; /* Add top margin */
`;

// Comments component
const Comments = ({ post }) => {
  const [comment, setComment] = useState({ name: "", postId: "", comments: "", date: new Date() }); // State for new comment
  const [comments, setComments] = useState([]); // State for comments
  const [toggle,setToggle] = useState(false); // State for toggling comments
  const { account } = useContext(DataContext); // Access account context

  // Fetch comments when component mounts or post or toggle changes
  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id); // Call API to fetch comments
      if (response.isSuccess) {
        setComments(response.data); // Set comments state with fetched data
      }
    };
    getData(); // Call getData function
  }, [post,toggle]); // Trigger effect when post or toggle changes

  // Handle change in comment input
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
    
  };

  // Function to add a new comment
  const addComment = async () => {
    let response = await API.newComment(comment); // Call API to add new comment
    if (response.isSuccess) {
      setComment({ name: "", postId: "", comments: "", date: new Date() }); // Reset comment state
      // Update comments by fetching again
      const updatedComments = await API.getAllComments(post._id);
      if (updatedComments.isSuccess) {
        setComments(updatedComments.data); // Set comments state with updated data
      }
      setToggle(prevState => !prevState); // Toggle state to trigger re-render
    }
  };

  return (
    <CommentsContainer>
      <DescriptionContainer>
        <CommentInputContainer>
          <Icon style={{ color: "#222831" }} /> {/* Render person icon */}
          <StyledTextArea
            rows={3} /* Limit to 3 rows */
            placeholder="What's on your mind" /* Set placeholder text */
            value={comment.comments} /* Bind textarea value to comment */
            onChange={(e) => handleChange(e)} /* Handle textarea change */
          />
          <Button
            variant="contained" /* Set button variant */
            color="primary" /* Set button color */
            size="medium" /* Set button size */
            style={{ height: 35, marginLeft: "10px" ,backgroundColor:"#76ABAE"}} /* Add inline styles */
            onClick={addComment} /* Handle button click */
          >
            Post {/* Button text */}
          </Button>
        </CommentInputContainer>
      </DescriptionContainer>
      {/* Render comments */}
      {comments.map(comment => <Comment key={comment._id} comment={comment} setToggle={setToggle}/>)}
    </CommentsContainer>
  );
};

export default Comments; // Export Comments component
