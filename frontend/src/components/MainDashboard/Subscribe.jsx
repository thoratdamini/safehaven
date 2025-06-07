import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Footer from '../MainDashboard/Footer';
import Header from '../MainDashboard/Header';
// import '../../scss/main.scss'; // Importing SCSS files
import '../../dist/main.css'; // Importing CSS files
import {useTranslation} from "react-i18next"; // Importing translation hook

const Subscribe = () => {
    // State variables for form fields, countries, and snackbar
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [t, i18n] = useTranslation("global"); // Translation hook

    // Fetch countries from REST Countries API on component mount
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryNames = data.map(country => country.name.common);
                const sortedCountries = countryNames.sort(); // Sort countries alphabetically
                setCountries(sortedCountries);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to send the subscription data
        const subscriptionData = {
            name: name,
            email: email,
            country: country
        };

        try {
            const response = await fetch('http://localhost:8000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriptionData)
            });

            if (response.ok) {
                setOpenSnackbar(true); // Open the snackbar
                clearForm(); // Clear form fields
            } else {
                console.error('Failed to query.');
            }
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };

    // Function to clear form fields
    const clearForm = () => {
        setName('');
        setEmail('');
        setCountry('');
    };

    // Function to handle snackbar close
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Header/>
            <div className="root">
                <div className='subscription-form'>
                <h3>HIiiii</h3> {/* Placeholder text */}
                <form onSubmit={handleSubmit} className="form-container">
                    {/* Text field for name */}
                    <TextField
                        label={t("query.name")} // Translated label
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{
                            className: 'input-label' // Custom class for input label
                        }}
                        InputProps={{
                            className: 'input-props', // Custom class for input
                        }}
                    />
                    {/* Text field for email */}
                    <TextField
                        label={t("query.email")} // Translated label
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{
                            className: 'input-label' // Custom class for input label
                        }}
                        InputProps={{
                            className: 'input-props', // Custom class for input
                        }}
                    />
                    {/* Dropdown for selecting country */}
                    <FormControl variant="outlined" fullWidth required margin="normal">
                        <InputLabel id="country-label" className="input-label">{t("query.country")}</InputLabel>
                        <Select
                            labelId="country-label"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            label="Country"
                        >
                            {/* Menu items for each country */}
                            {countries.map((country, index) => (
                                <MenuItem key={index} value={country}>{country}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Submit button */}
                    <Button type="submit" variant="contained" color="primary">
                    {t("query.button")} {/* Translated button label */}
                    </Button>
                </form>
                {/* Snackbar for showing subscription success message */}
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                        Successfully subscribed!
                    </MuiAlert>
                </Snackbar>
                <Footer /> {/* Footer component */}
                </div>
            </div>
        </>
    );
};

export default Subscribe;
