import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import Footer from '../MainDashboard/Footer'; // Importing Footer component
import Header from '../MainDashboard/Header'; // Importing Header component
import '../../dist/main.css'; // Importing custom styles
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook for translation
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; // Importing ExpandMoreIcon
import Accordion from '@material-ui/core/Accordion'; // Importing Accordion component
import AccordionSummary from '@material-ui/core/AccordionSummary'; // Importing AccordionSummary component
import AccordionDetails from '@material-ui/core/AccordionDetails'; // Importing AccordionDetails component

// FAQPage component
const FAQPage = () => {
    const [expanded, setExpanded] = React.useState(false); // State for controlling expanded accordion panels
    const [t,i18n] = useTranslation("global");
    // Function to handle accordion panel expansion
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Set the expanded state based on the current panel
    };

    // Array of FAQs with question and answer
    const faqs = [
        { id: 'panel1', question: 'home.applyRefugeeStatus', answer: 'home.applyRefugeeInstructions' },
        { id: 'panel2', question: 'home.refugeeBenefits', answer: 'home.benefitsDescription' },
        { id: 'panel3', question: 'home.statusProcessDuration', answer: 'home.processTimeframe' },
        { id: 'panel4', question: 'home.findLegalHelp', answer: 'home.legalHelpSources' },
        { id: 'panel5', question: 'home.educationalPrograms', answer: 'home.educationDetails' },
        { id: 'panel6', question: 'home.findEmployment', answer: 'home.employmentOptions' }
    ];

    return (
        <>
            <Header /> {/* Rendering Header component */}
            <div className="root" >
                <Paper elevation={3} className="paper-container" style={{ marginTop: '40px', marginBottom: '75px' }}> {/* Paper container for FAQ section */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                            {t('home.faq')}
                            </Typography>
                            {/* Mapping over FAQs array to render Accordion for each FAQ */}
                            {faqs.map((faq) => (
                                <Accordion
                                    key={faq.id}
                                    expanded={expanded === faq.id}
                                    onChange={handleChange(faq.id)}
                                    className="faq-accordion"
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />} // Expand icon
                                        aria-controls={`${faq.id}-content`}
                                        id={`${faq.id}-header`}
                                        className="faq-summary"
                                        style={{ color: '#fff', backgroundColor: '#76ABAE', paddingRight: '50px', width: 'calc(100% - 50px)' }} // Styling for AccordionSummary
                                    >
                                        <Typography>{t(faq.question)}</Typography> {/* Displaying FAQ question */}
                                    </AccordionSummary>
                                    <AccordionDetails className="faq-details" style={{ backgroundColor: '#fff', paddingRight: '50px', width: 'calc(100% - 50px)' }}> 
                                        <Typography>{t(faq.answer)}</Typography> {/* Displaying FAQ answer */}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
                <Footer /> {/* Rendering Footer component */}
            </div>
        </>
    );
};

export default FAQPage; // Exporting FAQPage component
