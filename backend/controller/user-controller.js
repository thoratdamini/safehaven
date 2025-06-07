import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Token from "../model/token.js";

// Load environment variables from .env file
dotenv.config();

// Controller to signup a new user
export const signupUser = async (request,response) =>{
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(request.body.password,10);
        
        // Create a new user object with hashed password
        const user = {
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword,
            age: request.body.age,
            gender: request.body.gender,
            city: request.body.city,
            nationality: request.body.nationality
        };

        // Create a new User instance with user object
        const newUser = new User(user);
        
        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return response.status(200).json({msg: 'Signup successful'});
    } catch (error) {
        // If an error occurs, respond with an error message
        return response.status(500).json({msg:'Error while signing up the user'});
    }
}

// Controller to login a user
export const loginUser = async (request, response) => {
    try {
        // Find the user by username in the database
        let user = await User.findOne({ username: request.body.username });
        if (!user) {
            // If user not found, respond with an error message
            return response.status(400).json({ msg: 'Username does not exist' });
        }

        // Compare the provided password with the hashed password stored in the database
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            // If passwords match, generate access and refresh tokens
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '20m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            // Save the refresh token to the database
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            // Respond with access and refresh tokens, user's name, and username
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });
        } else {
            // If passwords do not match, respond with an error message
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        // If an error occurs, respond with an error message
        response.status(500).json({ msg: 'Error while logging in' });
    }
}

// Controller to get details of all users (except admin)
export const getUsersDetails = async (request, response) => {
    try {
        // Find all user documents in the database
        const users = await User.find();
        
        // Filter out the user with the name "admin"
        const filteredUsers = users.filter(user => user.name !== "admin");
        
        // If users are found after filtering, send them as a response
        if (filteredUsers.length > 0) {
            response.status(200).json({ isSuccess: true, data: filteredUsers });
        } else {
            // If no users are found after filtering, send a 404 error response
            response.status(404).json({ isSuccess: false, message: 'No users found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 error response
        console.error('Error fetching users:', error);
        response.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
};

// Controller to delete a user
export const deleteUsersDetails = async (request, response) => {
    try {
        // Extract the user ID from the request parameters
        const userId = request.params.id;

        // Find and delete the user document from the database
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            // If user is found and deleted successfully, send a success response
            response.status(200).json({ isSuccess: true, message: 'User deleted successfully' });
        } else {
            // If user is not found, send a 404 error response
            response.status(404).json({ isSuccess: false, message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 error response
        console.error('Error deleting user:', error);
        response.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
};
