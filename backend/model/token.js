import mongoose from "mongoose";

// Define the schema for the Token entity
const tokenSchema = mongoose.Schema({
    // Token value
    token: {
        type: String,
        required: true
    }
});

// Create a Mongoose model named 'token' based on the tokenSchema
const token = mongoose.model('token', tokenSchema);

// Export the token model as the default export of this module
export default token;
