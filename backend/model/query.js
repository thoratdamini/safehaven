import mongoose from 'mongoose';

// Define the schema for the Query entity
const querySchema = new mongoose.Schema({
    // Name of the person submitting the query
    name: {
        type: String,
        required: true
    },
    // Email address of the person submitting the query
    email: {
        type: String,
        required: true
    },
    // Country of the person submitting the query
    country: {
        type: String,
        required: true
    },
    // Query submitted by the person
    query: {
        type: String,
        required: true
    },
    // Date when the query was created (automatically set to the current date and time)
    createdDate: {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new document is created
    }
});

// Create a Mongoose model named 'Query' based on the querySchema
const Query = mongoose.model('Query', querySchema);

// Export the Query model as the default export of this module
export default Query;
