import News from '../model/news.js'

// Controller to create a new news item
export const newNews = async (request, response) => {
    try {
        // Create a new instance of News model with the request body
        const newNews = await new News(request.body);
        // Save the new news item to the database
        newNews.save();

        // Respond with a success message
        response.status(200).json({msg: 'News saved successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to get all news items
export const getNews = async (request, response) => {
    try {
        // Find all news items in the database
        const news = await News.find(); 

        // Respond with the list of news items
        return response.status(200).json(news);
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({msg: error.message})
    }
}

// Controller to update a news item
export const updateNews = async (request, response) => {
    try {
        // Find the news item by ID
        const news = await News.findById(request.params.id);
        if (!news) {
            // If news item not found, respond with an error message
            return response.status(401).json({msg: 'News not found'});
        }

        // Update the news item with the request body
        await News.findByIdAndUpdate(request.params.id, {$set: request.body});
        // Respond with a success message
        return response.status(200).json({msg: 'News updated successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to delete a news item
export const deleteNewsDetails = async (request, response) => {
    try {
        // Get the news item ID from the request parameters
        const newsId = request.params.id;

        // Attempt to delete the news item by ID
        const deletedNews = await News.findByIdAndDelete(newsId);

        if (deletedNews) {
            // If news item is successfully deleted, respond with success message
            response.status(200).json({ isSuccess: true, message: 'News deleted successfully' });
        } else {
            // If news item not found, respond with an error message
            response.status(404).json({ isSuccess: false, message: 'News not found' });
        }
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error deleting news:', error);
        response.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
};
