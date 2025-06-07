import mongoose from 'mongoose';

// Define the schema for the Camp entity
const CampSchema = mongoose.Schema({
    // Title of the camp
    title: {
        type: String, // Data type is String
        required: true, // Title is required
    },
    // Location of the camp
    location: {
        type: String, // Data type is String
        required: true // Location is required
    },
    // Description of the camp
    description: {
        type: String, // Data type is String
        required: true // Description is required
    }
});

// Create a Mongoose model named 'camp' based on the CampSchema
const camp = mongoose.model('camp', CampSchema);

// Export the camp model as the default export of this module
export default camp;
