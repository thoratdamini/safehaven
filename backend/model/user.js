import mongoose from "mongoose";

// Define the schema for the User entity
const userSchema = mongoose.Schema({
    // Name of the user
    name: {
        type: String,
        required: true
    },
    // Username of the user (must be unique)
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Password of the user
    password: {
        type: String,
        required: true
    },
    // Age of the user
    age: {
        type: Number,
        required: true
    },
    // Gender of the user
    gender: {
        type: String,
        required: true
    },
    // City of the user
    city: {
        type: String,
        required: true
    },
    // Nationality of the user
    nationality: {
        type: String,
        required: true
    }
});

// Create a Mongoose model named 'User' based on the userSchema
const User = mongoose.model('user', userSchema);

// Export the User model as the default export of this module
export default User;
