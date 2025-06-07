import Camp from '../model/camp.js'

// Controller to create a new camp
export const newCamp = async (request, response) => {
    try {
        // Create a new instance of Camp model with the request body
        const newCamp = await new Camp(request.body);
        // Save the new camp to the database
        newCamp.save();

        // Respond with a success message
        response.status(200).json({msg: 'Camp saved successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to get all camps
export const getCamp = async (request, response) => {
    try {
        // Find all camps in the database
        const camp = await Camp.find(); 

        // Respond with the list of camps
        return response.status(200).json(camp);
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({msg: error.message})
    }
}

// Controller to update a camp
export const updateCamp = async (request, response) => {
    try {
        // Find the camp by ID
        const camp = await Camp.findById(request.params.id);
        if (!camp) {
            // If camp not found, respond with an error message
            return response.status(401).json({msg: 'Camp not found'});
        }

        // Update the camp with the request body
        await Camp.findByIdAndUpdate(request.params.id, {$set: request.body});
        // Respond with a success message
        return response.status(200).json({msg: 'Camp updated successfully'})
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json(error.message);
    }
}

// Controller to delete a camp
export const deleteCampsDetails = async (request, response) => {
    try {
        // Get the camp ID from the request parameters
        const campId = request.params.id;

        // Attempt to delete the camp by ID
        const deletedCamp = await Camp.findByIdAndDelete(campId);

        if (deletedCamp) {
            // If camp is successfully deleted, respond with success message
            response.status(200).json({ isSuccess: true, message: 'Camp deleted successfully' });
        } else {
            // If camp not found, respond with an error message
            response.status(404).json({ isSuccess: false, message: 'Camp not found' });
        }
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error deleting camp:', error);
        response.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
};
