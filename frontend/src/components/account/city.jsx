import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Array of cities
const cities = ["Boston", "New York", "California"]; // Add more cities as needed...

// Functional component to select a city
export default function SelectCity({ onChange }) {
  // State to manage the selected city
  const [city, setCity] = React.useState('');

  // Event handler for city selection change
  const handleChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    onChange(selectedCity); // Pass the selected city to the parent component
  };

  return (
    <div>
      {/* Form control for selecting a city */}
      <FormControl sx={{ m: 1, minWidth: 75 }} size="small">
        {/* Label for the city select input */}
        <InputLabel id="demo-simple-select-autowidth-label" style={{fontSize:"15px"}}>City</InputLabel>
        {/* Select input for choosing a city */}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={city}
          onChange={handleChange}
          autoWidth
          label="City"
          size="small"
        >
          {/* Placeholder for an empty selection */}
          <MenuItem value=""></MenuItem>
          {/* Map through the cities array to create menu items for each city */}
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
