import React, { useState } from "react";
import { AppBar, Toolbar, styled, InputBase, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Component = styled(AppBar)`
  background: #222831;
  color: #fff;
  top: 100px;
  left: 17%;
`;

const Container = styled(Toolbar)`
  left: 18%;
  display: flex;
  justify-content: center; /* Centering the search bar */
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Notify parent component (Home) about search query change
  };

  return (
    <Component>
      <Container>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Search>
      </Container>
    </Component>
  );
};

export default SearchBar;
