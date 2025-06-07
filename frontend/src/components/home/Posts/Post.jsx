import { motion } from "framer-motion";
import { Typography, styled } from "@mui/material";
import { addElipsis } from "../../../../utils/common-utils";
import { useState, useRef, useEffect } from "react";

// Styled component for the main container with motion animation
const Container = styled(motion.div)`
  border-radius: 9px; /* Set border radius */
  margin: 30px; /* Set margin */
  height: 280px; /* Set height */
  display: flex; /* Use flexbox for layout */
  align-items: flex-start; /* Align items to the start (left) */
  flex-direction: column; /* Set flex direction to column */
  position: relative; /* Set position to relative */
`;

// Styled component for text
const Text = styled(Typography)`
  color: white; /* Set text color */
  font-size: 12px; /* Set font size */
  text-align: left; /* Align text to the left */
  margin-left: 1%; /* Set left margin */
`;

// Styled component for heading
const Heading = styled(Typography)`
  font-size: 19px; /* Set font size */
  font-weight: 800; /* Set font weight */
  word-break: break-word; /* Allow word break */
  border-radius: 4px; /* Set border radius */
  padding: 10px; /* Set padding */
  text-align: left; /* Align text to the left */
  margin-left: 1%; /* Set left margin */
`;

// Styled component for details
const Details = styled(Typography)`
  font-size: 14px; /* Set font size */
  word-break: break-word; /* Allow word break */
  padding: 7px; /* Set padding */
  padding-right: 5px; /* Set right padding */
  border-radius: 4px; /* Set border radius */
  width: 40%; /* Set width */
  margin-left: 2%; /* Set left margin */
  overflow-y: auto; /* Enable overflow scrolling */
  min-height: 84px; /* Set minimum height */
  margin-right: 4px; /* Set right margin */
  text-align: left; /* Align text to the left */
`;

// Post component
const Post = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false); // State for hover
  const containerRef = useRef(null); // Ref for container
  const [detailsWidth, setDetailsWidth] = useState("auto"); // State for details width

  // useEffect to calculate details width based on container width
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth; // Get container width
      const maxWidth = containerWidth * 0.80; // Set max width as 80% of container width
      setDetailsWidth(maxWidth); // Set details width
    }
  }, [containerRef.current]); // Dependency on containerRef.current

  // Function to capitalize first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container
      ref={containerRef} // Set ref for container
      whileHover={{ scale: 1.08 }} // Animate scale on hover
      onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
      onMouseLeave={() => setIsHovered(false)} // Handle mouse leave event
      style={{
        backgroundColor: "#31363F", // Set background color
        boxShadow: "2px 2px 2px 2px #31363F", // Set box shadow
        ...(isHovered && { backgroundColor: "#222831" }), // Change background color on hover
      }}
    >
      {/* Text component for categories */}
      <Text style={{ marginTop: "15px", padding: "10px", borderRadius: 9, color: 'lightGrey' }}>
        {post.categories + " Category"}
      </Text>
      {/* Heading component for post title */}
      <Heading style={{ color: '#76ABAE', fontWeight: "bolder" }}>
        {addElipsis(capitalizeFirstLetter(post.title), 28)} {/* Add ellipsis to title */}
      </Heading>
      {/* Details component for post description */}
      <Details style={{ color: 'white', width: detailsWidth }}>
        {addElipsis("Description:  " + capitalizeFirstLetter(post.description), 100)} {/* Add ellipsis to description */}
      </Details>
      {/* Bottom details */}
      <div
        style={{
          position: "absolute", // Set position to absolute
          bottom: "10px", // Set bottom position
          left: "50%", // Set left position to center
          transform: "translateX(-50%)", // Center horizontally
          textAlign: "center", // Align text to center
          color: "white", // Set text color
          width: "100%", // Set width to 100%
          display: "flex", // Use flexbox for layout
          justifyContent: "space-between", // Space evenly between items
          padding: "0 10px", // Set padding
          marginLeft: "8px", // Set left margin
        }}
      >
        {/* Username */}
        <Typography variant="body2" style={{ fontSize: 12, color: "lightGrey", marginLeft: "15px", textAlign: "left" }}>
          {post.username}
        </Typography>
        {/* Date */}
        <Typography variant="body2" style={{ fontSize: 12, color: "lightGrey", marginRight: "28px", textAlign: "left" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </div>
    </Container>
  );
};

export default Post; // Export Post component
