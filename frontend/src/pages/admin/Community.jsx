import { Grid, Box } from "@mui/material";
import Posts from "./../../components/home/Posts/Posts";
import Categories from "../../components/home/Categories";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      {/* <Banner /> */}
      
      <div style={{paddingTop:'40px'}}>
        
      <Box
        sx={{
          marginLeft: "-4%", // Default margin-left
          marginTop: "15%", // Default margin-top 
          display: 'flex', // Use flexbox
          justifyContent: 'center', // Center content horizontally
          "@media (min-width: 100px)": {
            marginTop: "30%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 430px)": {
            marginTop: "17%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 600px)": {
            marginTop: "12%", // Adjust margin-top for small screens (sm)
          },
          "@media (min-width: 960px)": {
            marginTop: "6%", // Adjust margin-top for medium screens (md)
          },
          "@media (min-width: 1280px)": {
            marginTop: "2%", // Adjust margin-top for large screens (lg)
          },
        }}
      >
        <Grid container item xs={14} sm={12} lg={12}>
        <SearchBar onSearch={handleSearch}/>
          <Posts  searchQuery={searchQuery}/>
        </Grid>
      </Box>
      </div>
    </>
  );
};

export default Community;
