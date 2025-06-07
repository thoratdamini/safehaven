import mongoose from 'mongoose';

// Define the schema for the News entity
const NewsSchema = mongoose.Schema({
    // Title of the news
    title: {
        type: String,
        required: true,
    },
    // Location of the news
    location: {
        type: String,
        required: true
    },
    // Description of the news
    description: {
        type: String,
        required: true
    }
});

// Create a Mongoose model named 'news' based on the NewsSchema
const news = mongoose.model('news', NewsSchema);

// Export the news model as the default export of this module
export default news;
