import React from 'react'; 
import { Box, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"; 
import styled from "styled-components"; 
import { Link, useSearchParams } from "react-router-dom"; 
import CategoryIcon from "@mui/icons-material/Category"; 
import { categories } from "../../../constants/data"; 
import SchoolIcon from "@mui/icons-material/School"; 
import NightShelterIcon from "@mui/icons-material/NightShelter"; 
import PeopleIcon from "@mui/icons-material/People"; 
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; 
import { useTranslation } from "react-i18next";

// Map of category names to their corresponding icons
const iconMap = {
  Education: SchoolIcon,
  Shelter: NightShelterIcon,
  Medical: LocalHospitalIcon,
  "Community Center": PeopleIcon,
};

// Styled components for custom styling
const StyledTable = styled(Table)`
  border: 0;
`;

const StyledButton = styled(Button)`
  margin: 20px;
  padding: 12px;
  margin-top:45px;
  background: #76ABAE;
  border-radius: 7px;
  color: white;
  width:40%;
  text-transform: none;
  &:hover {
    background: rgba(118, 171, 174, 0.75);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  border-radius: 12px;
  background-color: #222831;
  border: 2px solid #222831;
  padding: 15px;
  width: 90%;
  display: block;
  transition: background-color 0.3s;
  margin-bottom: 10px;
  &:hover {
    background-color: #76ABAE;
  }
`;

const IconContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

const CategoryText = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

// Categories component for rendering a list of categories
const Categories = () => {
  const [searchParams] = useSearchParams(); // Get search parameters from URL
  const category = searchParams.get("category"); // Extract category from search parameters
  const { t } = useTranslation("global"); // Access translation function from i18n

  return (
    <Box
      style={{
        position: "fixed",
        backgroundColor: "#222831",
        flex: '1',
        height: "120vh",
        width:"17%",
        overflowY: "auto",
        marginTop:"-3.5%" // Adjusted marginTop to align with the main content
      }}
    >
      {/* Link to create new post */}
      <Link
        to={`/create?category=${category || ""}`}
        style={{ textDecoration: "none", marginBottom: "20px" }}
      >
        <StyledButton variant="contained">{t("user.startapost")}</StyledButton>
      </Link>

      {/* Table to display categories */}
      <StyledTable>
        <TableHead>
          <TableRow>
            {/* All categories link */}
            <TableCell style={{border: "none"}}>
              <StyledLink to={"/"}>
                <IconContainer>
                  <CategoryIcon />
                </IconContainer>
                <CategoryText>{t("user.allcategories")}</CategoryText>
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through categories and render each category */}
          {categories.map((category) => {
            const IconComponent = iconMap[category.type]; // Get corresponding icon for category
            return (
              <TableRow key={category.id}>
                <TableCell style={{border: "none"}}>
                  {/* Link to filter posts by category */}
                  <StyledLink
                    to={`/?category=${category.type}`}
                  >
                    <IconContainer>
                      {IconComponent && <IconComponent />} {/* Render icon if available */}
                    </IconContainer>
                    <CategoryText>{t(`user.${category.type}`)}</CategoryText> {/* Translate category name */}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default Categories; // Export Categories component
