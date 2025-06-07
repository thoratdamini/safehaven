import React, { useState } from "react"; 
import { Grid, Box } from "@mui/material"; 
import Header from "../header/Header"; 
import Categories from "./Categories"; 
import Posts from "./Posts/Posts";

// Home component responsible for rendering the home page
const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query); // Set search query state
  };

  return (
    <>
      {/* Render the Header component with search functionality */}
      <Header onSearch={handleSearch} />
      <Box
        sx={{
          marginTop: "10%", // Default margin-top
          "@media (min-width: 100px)": {
            marginTop: "45%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 430px)": {
            marginTop: "25%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 600px)": {
            marginTop: "15%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 960px)": {
            marginTop: "8%", // Adjust margin-top for medium screens (md)
          },
          "@media (min-width: 1280px)": {
            marginTop: "8%", // Adjust margin-top for large screens (lg)
          },
        }}
      >
        {/* Grid layout for organizing content */}
        <Grid container>
          {/* Grid item for Categories component */}
          <Grid item lg={2} sm={2} xs={12}>
            <Categories />
          </Grid>
          {/* Grid item for Posts component */}
          <Grid container item xs={12} sm={10} lg={10}>
            <Posts searchQuery={searchQuery} /> {/* Pass search query to Posts component */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home; // Export Home component
