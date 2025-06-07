import mongoose from 'mongoose';

// Define the schema for the Subscription entity
const subscriptionSchema = new mongoose.Schema({
    // Email address of the subscriber
    email: {
        type: String,
        required: true
    },
    // Date when the subscription was created
    createdDate: {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new document is created
    }
});

// Create a Mongoose model named 'NewsLetter' based on the subscriptionSchema
const NewsLetter = mongoose.model('NewsLetter', subscriptionSchema);

// Export the NewsLetter model as the default export of this module
export default NewsLetter;
