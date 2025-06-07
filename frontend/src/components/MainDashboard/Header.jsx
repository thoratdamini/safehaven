import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing motion components from Framer Motion
import { AppBar, Toolbar, Typography, Button, MenuItem, Select, styled } from "@mui/material"; // Importing components from Material-UI
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from Redux
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook for translation
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Importing the ExpandMoreIcon
// import '../../scss/main.scss'; // Importing SCSS files
import '../../dist/main.css'; // Importing main CSS file

// Styling the AppBar component using styled from Material-UI
const Component = styled(AppBar)`
  background: #ffffff;
  color: #fff;
`;

// Styling the Toolbar component using styled from Material-UI
const Container = styled(Toolbar)`
  display: flex;
  align-items: center;
  background-color: #222831;
`;

// Styling the image using styled from Material-UI
const Image = styled("img")({
  width: 100,
  height: 100,
});

// Styling the LinkWrapper component using styled from Material-UI
const LinkWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

// Styling the LinkItem component using styled from Material-UI
const LinkItem = styled(Link)`
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  padding: 0 25px;
  display: flex;
  align-items: center;
  &:first-child {
    margin-left: 100px; /* Add margin-left only for the first child */
  }
`;

// Styling the AnimatedButton component using styled from Material-UI and motion from Framer Motion
const AnimatedButton = styled(motion.button)`
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

// Styling the Select component using styled from Material-UI
const StyledSelect = styled(Select)`
  && {
    color: #fff;
    border: 1px solid #fff; /* Setting border to white */
    & > div {
      color: #fff; /* Setting text color to white */
    }
    & svg {
      fill: #fff; /* Setting dropdown arrow color to white */
    }
  }
`;

// Header component
const Header = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false); // State to track if login button is clicked

  // Function to handle login button click
  const handleLoginClick = () => {
    setIsLoginClicked(true);
    // Navigate to login page
    window.location.href = "/login"; // Change this to your login page URL
  };

  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const language = useSelector(state => state.language.language); // useSelector hook to access language from Redux store
  const [t, i18n] = useTranslation("global"); // Translation hook

  // Function to handle language change
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang); // Change language using i18n
    dispatch({ type: 'SET_LANGUAGE', payload: newLang }); // Dispatch action to set language in Redux store
  };

  return (
    <Component>
      <Container>
        <LinkWrapper>
          {/* Safe Haven Logo */}
          <LinkItem to="/home" style={{ padding: 0 }}>
            <Image
              src="/src/images/SafeHaven__3_-removebg-preview.png"
              alt="Safe Haven Logo"
            />
          </LinkItem>
          {/* Links */}
          <LinkItem to="/home/about">{t("home.about")}</LinkItem>
          <LinkItem to="/home/contact">{t("home.contact")}</LinkItem>
        </LinkWrapper>
        {/* Login button and language selector */}
        <div>
          {/* Animated login button */}
          <AnimatedButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLoginClick}
            className="loginbutton"
          >
            {t("home.login")} {/* Translated login text */}
          </AnimatedButton>
          {/* Language selector */}
          <StyledSelect
            value={language}
            onChange={handleLanguageChange}
            style={{ color: '#fff', marginRight: '20px' }}
            IconComponent={ExpandMoreIcon} // Using the ExpandMoreIcon as the dropdown icon
          >
            {/* Language options */}
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="de">DE</MenuItem>
            <MenuItem value="fr">FR</MenuItem>
          </StyledSelect>
        </div>
      </Container>
    </Component>
  );
};

export default Header;