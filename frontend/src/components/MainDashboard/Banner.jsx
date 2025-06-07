import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next"; // Importing useTranslation hook for translation

const useStyles = makeStyles((theme) => ({
  banner: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    backgroundImage: 'url("src/images/banner.jpg")',
    backgroundSize: 'cover',
    height: '600px',
    marginTop: '50px',
  },
  contentContainer: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#76ABAE',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
}));

const Banner = ({ onExploreCampsClick }) => {
    const classes = useStyles();
    const [t, i18n] = useTranslation("global");
  
    return (
      <div className={classes.banner}>
        <div className={classes.contentContainer}>
          <h1>{t("home.welcome")}</h1>
          <p>{t("home.welcomedesc")}</p>
          <button className={classes.button} onClick={onExploreCampsClick}>{t("home.explorecamps")}</button>
        </div>
      </div>
    );
  };

export default Banner;
