import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // Check if the route requires authentication
    if (!token) {
        return response.status(401).json({ msg: 'Token is missing' });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'Invalid token' });
        }

        // Check if the user is an admin
        if (user.name === 'admin') {
            request.user = user;
            return next(); // Proceed to the next middleware
        } else {
            // For non-admin users, continue with token verification
            jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
                if (error) {
                    return response.status(403).json({ msg: 'Invalid token' });
                }

                request.user = user;
                next();
            });
        }
    });
};
