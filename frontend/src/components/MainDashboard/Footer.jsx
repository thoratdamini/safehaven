import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SafeHavenLogo from '/src/images/SafeHaven__3_-removebg-preview.png'; // Importing the Safe Haven logo
import { useTranslation } from "react-i18next"; // Importing useTranslation hook for translation
import { TextField, Button, Snackbar } from '@material-ui/core'; // Importing Material-UI components
import MuiAlert from '@material-ui/lab/Alert'; // Importing the Alert component
// import '../../scss/main.scss'; // Importing SCSS files
import '../../dist/main.css'; // Importing main CSS file

// Custom styles for the Footer component
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#222831', // Background color
    color: '#fff', // Text color
    padding: theme.spacing(4), // Padding
    marginTop: '30px', // Top margin
    width: '100%', // Full width
  },
  container: {
    paddingLeft: '50px', // Left padding
    paddingRight: '50px', // Right padding
  },
  logo: {
    width: 100, // Logo width
    marginBottom: theme.spacing(1), // Bottom margin
  },
  socialIcon: {
    marginRight: theme.spacing(1), // Right margin
    fontSize: 20, // Font size
    cursor: 'pointer', // Cursor style
  },
  list: {
    listStyle: 'none', // Remove list style
    padding: 0, // Remove padding
    margin: 0, // Remove margin
  },
  link: {
    textDecoration: 'none', // Remove text decoration
    color: '#fff', // Text color
  },
  alertSuccess: {
    backgroundColor: '#8d8d2f', // Success alert background color
    color: '#ffffff' // Success alert text color
  },
  textInput: {
    color: '#ffffff', // Text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff', // Border color
      },
      '&:hover fieldset': {
        borderColor: '#ffffff', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff', // Border color on focus
      },
      '& input': {
        color: '#ffffff', // Text color
      },
    },
  },
  button: {
    color: '#fff', // Button text color
    backgroundColor: '#76ABAE' // Button background color
  },
}));

// Footer component
const Footer = () => {
  const classes = useStyles(); // Accessing custom styles
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for controlling Snackbar
  const [t, i18n] = useTranslation("global"); // Translation hook
  const [email, setEmail] = useState(''); // State for storing email input value

  // Function to handle subscription
  const handleSubscribe = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const emailData = {
      email: email // Email data
    };

    try {
      const response = await fetch('http://localhost:8000/add-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set content type header
        },
        body: JSON.stringify(emailData) // Convert emailData to JSON string and send in the request body
      });

      if (response.ok) {
        setOpenSnackbar(true); // Open success Snackbar
        clearForm(); // Clear email input field
      } else {
        console.error('Failed to send email.'); // Log error if failed to send email
      }
    } catch (error) {
      console.error('Error sending email:', error); // Log error if occurred while sending email
    }
  };

  // Function to clear email input field
  const clearForm = () => {
    setEmail(''); // Clear email input value
  };

  // Function to handle Snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false); // Close Snackbar
  };

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <img src={SafeHavenLogo} alt="SafeHaven Logo" className={classes.logo} /> {/* Safe Haven logo */}
            <div>
              {/* Social media icons */}
              <FaFacebook className={classes.socialIcon} />
              <FaTwitter className={classes.socialIcon} />
              <FaInstagram className={classes.socialIcon} />
              <FaYoutube className={classes.socialIcon} />
            </div>
          </Grid>
          {/* Column 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <strong>{t("home.locations")}</strong> {/* Translated locations title */}
              <ul className={classes.list}>
                <li>Boston</li>
                <li>New York</li>
                <li>California</li>
              </ul>
            </div>
          </Grid>
          {/* Column 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <strong>{t("home.quicklinks")}</strong> {/* Translated quick links title */}
              <ul className={classes.list}>
                <li><Link to="/home?refresh=true" className={classes.link}>{t("home.home")}</Link></li> {/* Translated Home link */}
                <li><Link to="/home/about" className={classes.link}>{t("home.about")}</Link></li> {/* Translated About link */}
                <li><Link to="/home/contact" className={classes.link}>{t("home.contact")}</Link></li> {/* Translated Contact link */}
                <li><Link to="/home/faq" className={classes.link}>FAQ</Link></li>
              </ul>
            </div>
          </Grid>
          {/* Column 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <strong>{t("home.subscribe")}</strong> {/* Translated subscribe title */}
              <TextField
                id="outlined-basic"
                label={t("home.email")} // Translated email label
                variant="outlined"
                fullWidth
                value={email}
                className={classes.textInput}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: '#fff' }
                }}
              />
              <Button variant="contained" className={classes.button} style={{ marginTop: '8px' }} onClick={handleSubscribe}>
                {t("home.subscribe")} {/* Translated subscribe button text */}
              </Button>
              {/* Snackbar for success message */}
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success" className={classes.alertSuccess}>
                  {t("home.subscribemessage")}
                </MuiAlert>
              </Snackbar>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;