import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material"; 
import { useState, useEffect, useContext } from "react"; 
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import { DataContext } from "../../context/DataProvider"; 
import { API } from "../../../service/api"; 
import Header from "../header/Header"; 
import { message } from "antd"; 

// Styled components for custom styling
const Container = styled(Box)`
  margin: 150px auto 50px; /* Adjusted margin for top spacing */
  max-width: 800px; /* Limit container width */
  background-color: #f0f2f5; /* Light grey background color */
  padding: 20px; /* Add padding for spacing */
  border-radius: 10px; /* Add border radius for rounded corners */
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 20px; /* Add top margin */
`;

const InputTextField = styled(InputBase)`
  flex: 1; /* Flexible width */
  margin: 0 10px; /* Adjust margin */
  font-size: 20px; /* Set font size */
`;

const Textarea = styled(TextareaAutosize)`
  width: calc(100% - 40px); /* Adjust width to fit container */
  margin-top: 20px; /* Add top margin */
  font-size: 18px; /* Set font size */
  border: none; /* Remove border */
  &:focus-visible {
    outline: none; /* Remove outline on focus */
  }
  border-radius: 10px; /* Add border radius */
  padding: 10px; /* Add padding */
`;

const PublishButton = styled(Button)`
  margin-top: 20px; /* Add top margin */
  text-transform: none; /* Prevent capitalizing all words */
  width: fit-content; /* Adjust width to fit content */
  height: fit-content; /* Adjust height to fit content */
  margin: 0 auto; /* Center the button */
  display: block; /* Ensure the button is displayed as block element */
  background-color: #76ABAE; /* Set background color */
  &:hover {
    background-color: #76ABAF; /* Change background color on hover */
  }
`;

// Initial post state
const initialPost = {
  title: "",
  description: "",
  // picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

// Component for updating a post
const UpdatePost = () => {
  const navigate = useNavigate(); // Access navigate function from React Router
  const location = useLocation(); // Access location object from React Router
  const { account } = useContext(DataContext); // Access account context
  const { id } = useParams(); // Access id parameter from URL
  const [post, setPost] = useState(initialPost); // State for post data
  const [file, setFile] = useState(""); // State for file data

  // Fetch post data by id when component mounts
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id); // Call API to get post by id
      if (response.isSuccess) {
        setPost(response.data); // Set post state with fetched data
      }
    };
    fetchData(); // Call fetchData function
  }, [id]); // Trigger effect when id changes

  // Upload image and update post data when file or location changes
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data); // Call API to upload file
        post.picture = response.data; // Update post picture with response data
      }
    };
    getImage(); // Call getImage function
    post.categories = location.search?.split("=")[1] || "All"; // Set categories based on query parameter or default to 'All'
    post.username = account.username; // Set username from account context
  }, [file]); // Trigger effect when file or location changes

  // Function to update post
  const updatePost = async () => {
    // Add "Edited Post" notice to the updated post description
    const updatedPost = {
      ...post,
      description: `${post.description}`,
    };

    let response = await API.updatePost(updatedPost); // Call API to update post
    if (response.isSuccess) {
      message.success("Your Post Updated", 1); // Show success message
      navigate(`/details/${id}`); // Navigate to post details page
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value }); // Update post state
  };

  return (
    <>
      <Header /> {/* Render Header component */}
      <Box>
        <Container>
          <StyledFormControl>
            <InputTextField
              onChange={(e) => handleChange(e)} // Handle title input change
              name="title" // Set input name attribute
              placeholder="Title" // Set placeholder text
              value={post.title} // Bind input value to post title
            />
          </StyledFormControl>
          <Textarea
            rowsMin={5} // Set minimum rows for textarea
            placeholder="Update Your Description..." // Set placeholder text
            name="description" // Set textarea name attribute
            onChange={(e) => handleChange(e)} // Handle textarea change
            value={post.description} // Bind textarea value to post description
          />
          <PublishButton
            style={{ marginTop: "30px" }} // Add inline style for top margin
            onClick={() => updatePost()} // Handle button click
            variant="contained" // Set button variant
            color="primary" // Set button color
          >
            Update {/* Button text */}
          </PublishButton>
        </Container>
      </Box>
    </>
  );
};

export default UpdatePost; // Export UpdatePost component
