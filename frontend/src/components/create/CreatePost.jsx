import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from '../../../service/api';
import Header from "../header/Header";
import { message } from "antd";

// Styled components for styling
const Container = styled(Box)`
  margin: 150px auto 50px; /* Adjusted margin for top spacing */
  max-width: 800px; /* Limit container width */
  background-color: #f0f2f5; /* Light grey background color */
  padding: 20px; /* Add padding for spacing */
  border-radius: 10px; /* Add border radius for rounded corners */
  width: auto; 
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
  username: "",
  categories: "",
  createdDate: new Date(),
};

// Component for creating a post
const CreatePost = () => {
  const navigate = useNavigate(); // Access navigate function from React Router
  const location = useLocation(); // Access location object from React Router
  const { account } = useContext(DataContext); // Access account context
  const [post, setPost] = useState(initialPost); // State for post data
  const [file, setFile] = useState(''); // State for file data

  useEffect(() => {
    // Function to upload image
    const getImage = async () => { 
      if(file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    const response = await API.createPost(post);
    if(response.isSuccess){
      message.success("Your Post Published",1)
      navigate('/');
    }
    else{
      message.error("You have some issue with creating Post",2)
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <Box>
        <Container>
          <StyledFormControl style={{width:"90%"}}>
            <InputTextField
              onChange={(e) => handleChange(e)}
              name='title'
              placeholder="Title"
              style={{width:"90%"}}
            />
          </StyledFormControl>
          <Textarea
            rowsMin={5} // Set minimum rows for textarea
            placeholder="Tell your story..." // Set placeholder text
            name='description' // Set textarea name attribute
            onChange={(e) => handleChange(e)} // Handle textarea change
          />
          <PublishButton
            style={{ marginTop: "30px" }} // Add inline style for top margin
            onClick={() => savePost()} // Handle button click
            variant="contained" // Set button variant
            color="primary" // Set button color
          >
            Publish {/* Button text */}
          </PublishButton>
        </Container>
      </Box>
    </>
  );
};

export default CreatePost;