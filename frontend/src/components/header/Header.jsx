import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Select,
  styled,
  InputBase,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { DataContext } from "../../context/DataProvider";

// Styled component for the main AppBar
const Component = styled(AppBar)`
  background: #222831; /* Set background color */
  color: #fff; /* Set text color */
`;

// Styled component for the Toolbar container
const Container = styled(Toolbar)`
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space evenly between items */
  align-items: center; /* Align items vertically */
`;

// Styled component for the left content container
const LeftContent = styled("div")`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Align items vertically */
  margin-right: 10%; /* Set right margin */
`;

// Styled component for the center content container
const CenterContent = styled("div")`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Align items vertically */
  margin-left: ${({ searchVisible }) => (searchVisible ? "0" : "-14%")}; /* Adjust margin based on search visibility */
`;

// Styled component for the logo image
const Image = styled("img")`
  width: 100px; /* Set width */
  height: 100px; /* Set height */
`;

// Styled component for the right content container
const RightContent = styled("div")`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Align items vertically */
`;

// Styled component for the search container
const Search = styled("div")(({ theme }) => ({
  position: "relative", /* Set position relative */
  borderRadius: theme.shape.borderRadius, /* Set border radius */
  backgroundColor: alpha(theme.palette.common.white, 0.15), /* Set background color with alpha */
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25), /* Change background color on hover */
  },
  marginRight: theme.spacing(2), /* Set right margin */
  width: "auto", /* Set width to auto */
}));

// Styled component for the search icon wrapper
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2), /* Set padding */
  height: "100%", /* Set height */
  position: "absolute", /* Set position absolute */
  pointerEvents: "none", /* Disable pointer events */
  display: "flex", /* Use flexbox for layout */
  alignItems: "center", /* Align items vertically */
  justifyContent: "center", /* Center content horizontally */
}));

// Styled component for the input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit", /* Inherit text color */
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0), /* Set padding */
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, /* Calculate left padding */
    transition: theme.transitions.create("width"), /* Add transition for width */
    width: "100%", /* Set width to 100% */
    [theme.breakpoints.up("md")]: {
      width: "20ch", /* Set width for medium screens */
    },
  },
}));

// Header component
const Header = ({ onSearch }) => {
  const { account } = useContext(DataContext); /* Get account from DataContext */
  const location = useLocation(); /* Get current location */
  const isHomePage = location.pathname === "/"; /* Check if current page is home page */
  const [searchVisible, setSearchVisible] = useState(isHomePage); /* State for search visibility */

  const [t, i18n] = useTranslation("global"); /* Translation hooks */
  const language = useSelector((state) => state.language.language); /* Get language from Redux store */
  const dispatch = useDispatch(); /* Dispatch function */
  const [searchQuery, setSearchQuery] = useState(""); /* State for search query */

  // Handle language change
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    dispatch({ type: "SET_LANGUAGE", payload: newLang }); /* Dispatch action to update language */
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); /* Notify parent component (Home) about search query change */
  };

  // Capitalize first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Component>
      <Container>
        {/* Left content */}
        <LeftContent>
          <span style={{ color: "white", marginRight: "0.3em" }}>
            Welcome, {capitalizeFirstLetter(account.name)}
          </span>
        </LeftContent>
        {/* Center content */}
        <CenterContent searchVisible={searchVisible}>
          <Image
            src="/src/images/SafeHaven__3_-removebg-preview.png"
            alt="SafeHaven Logo"
          />
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "400",
              marginRight: "15%",
            }}
            to="/"
          >
            {t("home.home")}
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "400",
            }}
            to="/login"
          >
            Logout
          </Link>
        </CenterContent>
        {/* Right content */}
        <RightContent>
          {/* Render search input if on home page */}
          {isHomePage && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…" /* Placeholder text */
                inputProps={{ "aria-label": "search" }} /* ARIA label */
                value={searchQuery} /* Search query value */
                onChange={handleSearchInputChange} /* Handle input change */
                onFocus={() => setSearchVisible(true)} /* Show search input on focus */
                onBlur={() => setSearchVisible(false)} /* Hide search input on blur */
              />
            </Search>
          )}
          {/* Language select */}
          <Select
            value={language} /* Selected language */
            onChange={handleLanguageChange} /* Handle language change */
            size="small" /* Set size */
            sx={{
              color: "white", /* Set text color */
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", /* Set border color */
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", /* Set border color on hover */
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", /* Set border color when focused */
              },
            }}
          >
            {/* Language options */}
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="de">DE</MenuItem>
            <MenuItem value="fr">FR</MenuItem>
          </Select>
        </RightContent>
      </Container>
    </Component>
  );
};

export default Header; /* Export Header component */
