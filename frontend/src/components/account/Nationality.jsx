import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from '@mui/material'

// Styled component for customizing FormControl
const Size = styled(FormControl)`
  && {
    size: "small"; // Set the size to small
    & > .MuiSelect-root {
      height: 30px; // Reduce select height
      font-size: 14px; // Reduce font size
    }
    & .MuiInputLabel-root {
      font-size: 14px; // Reduce label font size
      margin-bottom: 4px; // Adjust label margin
    }
  }
`;

// Array of countries
const countries = [
  "India",
  "USA",
  "Angola",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Brazil",
  "Canada",
  "Cameroon",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Egypt",
  "El Salvador",
  "Ecuador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Hong Kong",
  "Hungary",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Tanzania",
  "Thailand",
  "Trinidad and Tobago",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// Functional component to select a nationality
export default function SelectNationality({ onChange }) {
  // State to manage the selected nationality
  const [nationality, setNationality] = React.useState("");

  // Event handler for nationality selection change
  const handleChange = (event) => {
    const selectedNationality = event.target.value;
    setNationality(selectedNationality);
    onChange(selectedNationality); // Pass the selected nationality to the parent component
  };

  return (
    <div>
      {/* Styled FormControl for selecting a nationality */}
      <Size sx={{ s: 1, minWidth: 190 }}>
        {/* Label for the nationality select input */}
        <InputLabel id="demo-simple-select-autowidth-label" style={{fontSize:"15px", marginTop:"-8px",marginLeft:"-4px"}}>
          Select a Nationality
        </InputLabel>
        {/* Select input for choosing a nationality */}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={nationality}
          onChange={handleChange}
          autoWidth
          label="Nationality"
          size="small" // Set the size to small
        >
          {/* Placeholder for an empty selection */}
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* Map through the countries array to create menu items for each country */}
          {countries.map((country, index) => (
            <MenuItem key={index} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </Size>
    </div>
  );
}