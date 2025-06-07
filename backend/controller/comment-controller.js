import Comment from "../model/comment.js";

// Controller to create a new comment
export const newComment = async (request, response) => {
    try {
        // Create a new instance of Comment model with the request body
        const newComment = await new Comment(request.body);
        // Save the new comment to the database
        newComment.save();

        // Respond with a success message
        response.status(200).json({msg: 'Comment saved successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to get comments by postId
export const getComments = async (request, response) => {
    try {
        // Find all comments associated with the postId from request parameters
        const comments = await Comment.find({ postId: request.params.id });
        
        // Respond with the list of comments
        response.status(200).json(comments);
    } catch (error) {
        // If an error occurs, respond with an error message
        response.status(500).json(error)
    }
}

// Controller to delete a comment
export const deleteComment = async (request, response) => {
    try {
        // Get the comment ID from the request parameters
        const commentId = request.params.id;
        // Attempt to delete the comment by ID
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        
        if (!deletedComment) {
            // If comment not found, respond with an error message
            return response.status(404).json({ msg: 'Comment not found' });
        }
        
        // Respond with a success message if comment is successfully deleted
        return response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error deleting comment:', error);
        return response.status(500).json({ error: error.message });
    }
}
