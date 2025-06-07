import Post from '../model/post.js';

// Controller to create a new post
export const createPost = async (request, response) => {
    try {
        // Replace '%20' with space in the categories string
        let category = request.body.categories;
        category = category.replace(/%20/g, ' ');

        // Create a new Post instance with request body
        const post = new Post({
            title: request.body.title,
            description: request.body.description,
            username: request.body.username,
            categories: category,
            createdDate: new Date()
        });

        // Save the new post to the database
        await post.save();

        // Respond with success message
        return response.status(200).json('Post saved successfully');
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error);
    }
}

// Controller to search for posts based on a query
export const searchPosts = async (request, response) => {
    const { query } = request.query; // Extract the search query from the request
    try {
        // Search for posts that match the query in title, description, username, or categories
        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Search by title
                { description: { $regex: query, $options: 'i' } }, // Search by description
                { username: { $regex: query, $options: 'i' } }, // Search by username
                { categories: { $regex: query, $options: 'i' } } // Search by categories
            ]
        });
        // Return the matching posts
        return response.status(200).json(posts);
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({ error: error.message });
    }
};

// Controller to get all posts
export const getAllPosts = async (request, response) => {
    try {
        const { username, category } = request.query;
        let posts;
        // Check if username or category query parameters are provided
        if (username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({}); // If no query parameters provided, return all posts
        return response.status(200).json(posts);
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({ error: error.message });
    }
};

// Controller to get a post by ID
export const getPost = async (request,response) => {
    try {
       // Find the post by ID
       const post = await Post.findById(request.params.id); 
       // Respond with the post
       return response.status(200).json(post);
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({msg: error.message})
    }
}

// Controller to update a post
export const updatePost = async (request,response) => {
    try {
        // Find the post by ID
        const post = await Post.findById(request.params.id);
        if(!post){
            // If post not found, respond with an error message
            return response.status(401).json({msg: 'Post not found'});
        }

        // Update the post with the request body
        await Post.findByIdAndUpdate(request.params.id, {$set: request.body});
        // Respond with a success message
        return response.status(200).json({msg: 'Post updated successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to delete a post
export const deletePost = async (request, response) => {
    try {
        // Find and delete the post by ID
        const post = await Post.findByIdAndDelete(request.params.id);
        if (!post) {
            // If post not found, respond with an error message
            return response.status(404).json({ msg: 'Post not found' });
        }
        // Respond with a success message
        return response.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error deleting post:', error);
        return response.status(500).json({ error: error.message });
    }
}
