import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Footer from '../MainDashboard/Footer'; // Importing Footer component
import Header from '../MainDashboard/Header'; // Importing Header component
// import '../../scss/main.scss'; // Importing custom SCSS file
import '../../dist/main.css'; // Importing custom CSS file
import { useTranslation } from "react-i18next"; // Importing useTranslation hook for translation

// Contact component
const Contact = () => {
    const [name, setName] = useState(''); // State for name field
    const [email, setEmail] = useState(''); // State for email field
    const [country, setCountry] = useState(''); // State for country field
    const [query, setQuery] = useState(''); // State for query field
    const [countries, setCountries] = useState([]); // State for storing countries list
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for controlling Snackbar visibility
    const [t, i18n] = useTranslation("global"); // Translation hook

    useEffect(() => {
        // Fetch countries from REST Countries API
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
        // Logic to send the email
        const emailData = {
            name: name,
            email: email,
            country: country,
            query: query
        };

        try {
            const response = await fetch('http://localhost:8000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (response.ok) {
                setOpenSnackbar(true); // Open the snackbar
                clearForm(); // Clear form fields
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    // Function to clear form fields
    const clearForm = () => {
        setName('');
        setEmail('');
        setCountry('');
        setQuery('');
    };

    // Function to handle closing of Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Header/> {/* Render Header component */}
            <div className="root" style={{ marginTop: '100px', marginBottom: '85px' }}>
                <div className='query'>
                    <h3>{t("query.submitquery")}</h3>
                    {/* Contact form */}
                    <form onSubmit={handleSubmit} className="form-container">
                        {/* Name field */}
                        <TextField
                            label={t("query.name")}
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                className: 'input-label'
                            }}
                            InputProps={{
                                className: 'input-props',
                            }}
                        />
                        {/* Email field */}
                        <TextField
                            label={t("query.email")}
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                className: 'input-label'
                            }}
                            InputProps={{
                                className: 'input-props',
                            }}
                        />
                        {/* Country field */}
                        <FormControl variant="outlined" fullWidth required margin="normal" style={{textAlign: 'left'}}>
                            <InputLabel id="country-label" className="input-label">{t("query.country")}</InputLabel>
                            <Select
                                labelId="country-label"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                label="Country"
                            >
                                {/* Mapping over countries array to render MenuItem for each country */}
                                {countries.map((country, index) => (
                                    <MenuItem key={index} style={{textAlign: 'left'}} value={country}>{country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Query field */}
                        <TextField
                            label="Query"
                            variant="outlined"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            required
                            margin="normal"
                            InputLabelProps={{
                                className: 'input-label'
                            }}
                            InputProps={{
                                className: 'input-props',
                            }}
                        />
                        {/* Submit button */}
                        <Button type="submit" variant="contained" color="primary" style={{backgroundColor:'#76ABAE'}}>
                            {t("query.submit")}
                        </Button>
                    </form>
                    {/* Snackbar for displaying success message */}
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                            {t("query.querysent")}
                        </MuiAlert>
                    </Snackbar>
                </div>
            </div>
            <Footer /> {/* Render Footer component */}
        </>
    );
};

export default Contact; // Export Contact component
