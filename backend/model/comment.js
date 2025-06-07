import mongoose from 'mongoose';

// Define the schema for the Comment entity
const CommentSchema = mongoose.Schema({
    // Name of the commenter (optional)
    name: {
        type: String,
        required: false,
    },
    // ID of the post to which the comment belongs
    postId: {
        type: String,
        required: false
    },
    // Date of the comment
    date: {
        type: String,
        required: true
    },
    // The comment content
    comments: {
        type: String,
        required: false
    }
});

// Create a Mongoose model named 'comment' based on the CommentSchema
const comment = mongoose.model('comment', CommentSchema);

// Export the comment model as the default export of this module
export default comment;
