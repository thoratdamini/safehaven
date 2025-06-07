import Query from '../model/query.js';
import nodemailer from 'nodemailer';

// Function to send email
const sendEmail = async (name, email, country, query) => {
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'teamatsafehaven@gmail.com',
                pass: 'ikno lako iwwh qupf' // Please use environment variables for security
            }
        });

        // Send mail with defined transport object
        await transporter.sendMail({
            from: '"SafeHaven" <teamatsafehaven@gmail.com>',
            to: email,
            subject: 'Thanks for your query!',
            text: `Hi ${name},\n\nThank you for reaching out. We have received your query from ${country} and will get back to you soon.\n\nRegards,\nTeam at SafeHaven`
        });

        console.log('Email sent successfully!');
    } catch (error) {
        // If an error occurs while sending email, log the error and throw an error
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
};

// Controller to add a new query
const addQuery = async (req, res) => {
    const { name, email, country, query} = req.body;

    try {
        // Create a new Query instance with the provided data
        const newQuery = new Query({
            name,
            email,
            country,
            query,
        });

        // Save the new query to the database
        await newQuery.save();

        // Send email to the user
        await sendEmail(name, email, country, query);

        // Respond with a success message
        res.status(201).json({ message: 'Query added successfully' });
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error adding query:', error);
        res.status(500).json({ message: 'Failed to add query' });
    }
};

// Controller to get all queries
export const getAllQueries = async (req, res) => {
    try {
        // Find all queries in the database
        const queries = await Query.find();

        // Respond with the list of queries
        res.status(200).json(queries);
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error fetching queries:', error);
        res.status(500).json({ message: 'Failed to fetch queries' });
    }
};

// Controller to delete a query
export const deleteQuery = async (request, response) => {
    try {
        // Get the query ID from the request parameters
        const queryId = request.params.id;

        // Attempt to delete the query by ID
        const deletedQuery = await Query.findByIdAndDelete(queryId);

        if (deletedQuery) {
            // If query is successfully deleted, respond with success message
            response.status(200).json({ isSuccess: true, message: 'Query deleted successfully' });
        } else {
            // If query not found, respond with an error message
            response.status(404).json({ isSuccess: false, message: 'Query not found' });
        }
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error deleting query:', error);
        response.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
};

export { addQuery };
