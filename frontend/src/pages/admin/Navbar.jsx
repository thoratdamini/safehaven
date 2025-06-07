import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Select, MenuItem, TextField } from "@mui/material";

const Navbar = ({ handleFilter }) => {
  const [city, setCity] = useState("All");
  const [name, setName] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const filterUsers = () => {
    handleFilter(city, name);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "#222831"}}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Users
          </Typography>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            size="small"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            sx={{ mr: 2, color: "white" }}
          />
          <Select
            id="city"
            value={city}
            onChange={handleCityChange}
            variant="outlined"
            size="small"
            sx={{ mr: 2, color: "white" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Boston">Boston</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="California">California</MenuItem>
          </Select>

          <Button
            color="inherit"
            onClick={filterUsers}
            sx={{
              backgroundColor: "white",
              color: "#31363F",
              "&:hover": { backgroundColor: "grey" },
            }}
          >
            Filter
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
