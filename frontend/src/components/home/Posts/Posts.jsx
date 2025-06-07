import React, { useEffect, useState, useContext } from "react";
import { API } from "../../../../service/api";
import { Box, Grid } from "@mui/material"; 
import Post from "./Post"; 
import { useSearchParams, Link } from "react-router-dom"; 
import { DataContext } from "../../../context/DataProvider";

// Posts component responsible for rendering a list of posts
const Posts = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]); // State to store all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State to store filtered posts based on search query
  const { account } = useContext(DataContext); // Access account data from context
  const [searchParams] = useSearchParams(); // Get search parameters from URL
  const category = searchParams.get("category"); // Extract category from search parameters

  // Fetch all posts based on category
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" }); // Fetch posts based on category
      if (response.isSuccess) {
        setPosts(response.data); // Update posts state with fetched data
      }
    };
    fetchData(); // Call fetchData function
  }, [category]); // Dependency on category

  // Filter posts based on search query
  useEffect(() => {
    // Filter posts based on searchQuery
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categories.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered); // Update filteredPosts state with filtered data
  }, [searchQuery, posts]); // Dependencies on searchQuery and posts

  return (
    <>
      {/* Conditionally render posts or "No data available" message */}
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            {/* Conditionally generate the route based on whether the username is admin */}
            <Link
              to={
                account.username === "admin"
                  ? `/admin/community/details/${post._id}`
                  : `/details/${post._id}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} /> {/* Render Post component */}
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No data available to display
        </Box>
      )}
    </>
  );
};

export default Posts; // Export Posts component
