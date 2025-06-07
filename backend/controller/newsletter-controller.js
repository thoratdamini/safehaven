import NewsLetter from '../model/newsletter.js';
import nodemailer from 'nodemailer';

// Function to send email to subscribe
const sendEmailtoSubscribe = async (email) => {
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'teamatsafehaven@gmail.com',
                pass: 'ikno lako iwwh qupf' 
            }
        });

        // Send mail with defined transport object
        await transporter.sendMail({
            from: '"SafeHaven" <teamatsafehaven@gmail.com>',
            to: email,
            subject: 'Thank you for subscribing!',
            text: `We have received your subscription and will get back to you soon with our latest updates. We will be sending newsletters regarding camps and news.\n\nRegards,\nTeam at SafeHaven`
        });

        console.log('Email sent successfully!');
    } catch (error) {
        // If an error occurs while sending email, log the error and throw an error
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
};

// Controller to add a new subscription
const addSubscription = async (req, res) => {
    const { email } = req.body;

    try {
        // Create a new NewsLetter instance with the provided email
        const newNewsLetter = new NewsLetter({
            email
        });

        // Save the new subscription to the database
        await newNewsLetter.save();

        // Send email to the user
        await sendEmailtoSubscribe(email);

        // Respond with a success message
        res.status(201).json({ message: 'Subscription added successfully' });
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error adding subscription:', error);
        res.status(500).json({ message: 'Failed to add subscription' });
    }
};

// Controller to get all subscriptions
export const getAllSubscriptions = async (req, res) => {
    try {
        // Find all subscriptions in the database
        const subscriptions = await NewsLetter.find();

        // Respond with the list of subscriptions
        res.status(200).json(subscriptions);
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Failed to fetch subscriptions'});
    }
};

export { addSubscription };
