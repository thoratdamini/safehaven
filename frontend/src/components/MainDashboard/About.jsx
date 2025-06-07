import React from 'react';
import { Paper, Typography, Grid, Box, Avatar, makeStyles } from '@material-ui/core'; // Importing Material-UI components
import Footer from '../MainDashboard/Footer'; // Importing Footer component
import Header from '../MainDashboard/Header'; // Importing Header component
import '../../scss/main.scss'; // Importing SCSS styles
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook for translation
import SafeHavenLogo from '/src/images/SafeHaven__2_-removebg-preview.png'; // Import the SafeHaven logo
import Person1 from '/src/images/SohanImage.jpg'; // Import profile image for person 1
import Person2 from '/src/images/SmitImage.jpg'; // Import profile image for person 2
import Person3 from '/src/images/DaminiImage.jpg'; // Import profile image for person 3
import Person4 from '/src/images/DakshImage.jpg'; // Import profile image for person 4

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  // Styles for the "Meet the Team" section
  teamSection: {
    marginTop: theme.spacing(4), // Increase the margin between "Meet the Team" and the icons
    marginBottom: theme.spacing(4), // Increase the margin below the icons
  },
  // Styles for the avatar
  avatar: {
    width: '100px',
    height: '100px',
    margin: 'auto',
    marginBottom: theme.spacing(1), // Decrease the margin below each icon
  },
}));

// Functional component for the About page
const About = () => {
  const [t, i18n] = useTranslation("global"); // Translation hook
  const classes = useStyles(); // Custom styles

  return (
    <>
      <Header /> {/* Header component */}
      <div className="root">
        {/* Paper container */}
        <Paper elevation={3} className="paper-container">
          <Grid container spacing={3}>
            {/* Left side */}
            <Grid item xs={12} md={6} className="left-content">
              <Grid container alignItems="center">
                {/* SafeHaven logo */}
                <Grid item>
                  <img src={SafeHavenLogo} alt="SafeHaven Logo" style={{ height: '150px', marginRight: '10px' }} />
                </Grid>
                {/* SafeHaven heading */}
                <Grid item>
                  <Typography variant="h4" gutterBottom>
                    SafeHaven
                  </Typography>
                </Grid>
              </Grid>
              {/* SafeHaven description */}
              <Typography variant="body1" paragraph>
                {t("about.description")}   {t("about.desc")}
              </Typography>
            </Grid>
            {/* Right side */}
            <Grid item xs={12} md={6} className="right-content">
              <Typography variant="h6">{t("about.aboutsafehaven")}</Typography>
              <Grid container spacing={2}>
                {/* First row */}
                <Grid item xs={6} className="additional-item">
                  <Typography variant="h5">10k+</Typography>
                  <Typography variant="body2">
                    {t("about.aboutsafehavendesc")}
                    {t("about.cities")}
                  </Typography>
                </Grid>
                {/* Second row */}
                <Grid item xs={6} className="additional-item">
                  <Typography variant="h5">{t("about.city")}</Typography>
                  <Typography variant="body2">
                    {t("about.camplocations")}
                  </Typography>
                </Grid>
                <Grid item xs={6} className="additional-item">
                  <Typography variant="h5">{t("about.helpisontheway")}</Typography>
                  <Typography variant="body2">
                    {t("about.fillupquery")}
                  </Typography>
                </Grid>
                <Grid item xs={6} className="additional-item">
                  <Typography variant="h5">{t("about.morecamps")}</Typography>
                  <Typography variant="body2">
                    {t("about.morecampsus")}
                  </Typography>
                </Grid>
                {/* Add more items as needed */}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Meet the Team section */}
        <Typography variant="h4" align="center" className={classes.teamSection}>
          {t("about.meettheteam")}
        </Typography>
        <Grid container spacing={0} justify="center">
          {/* Profile 1 */}
          <Grid item xs={6} sm={3}>
            <Avatar alt="Person 1" src={Person1} className={classes.avatar} />
            <Typography variant="h6" align="center">Sohan Patil</Typography>
            <Typography variant="body2" align="center">Software Engineer</Typography>
          </Grid>
          {/* Profile 2 */}
          <Grid item xs={6} sm={3}>
            <Avatar alt="Person 2" src={Person2} className={classes.avatar} />
            <Typography variant="h6" align="center">Smit Patel</Typography>
            <Typography variant="body2" align="center">Software Engineer</Typography>
          </Grid>
          {/* Profile 3 */}
          <Grid item xs={6} sm={3}>
            <Avatar alt="Person 3" src={Person3} className={classes.avatar} />
            <Typography variant="h6" align="center">Damini Thorat</Typography>
            <Typography variant="body2" align="center">Software Engineer</Typography>
          </Grid>
          {/* Profile 4 */}
          <Grid item xs={6} sm={3}>
            <Avatar alt="Person 4" src={Person4} className={classes.avatar} />
            <Typography variant="h6" align="center">Daksh Patel</Typography>
            <Typography variant="body2" align="center">Software Engineer</Typography>
          </Grid>
        </Grid>
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default About; // Exporting About component
