const jwt = require('jsonwebtoken');

// This secret should ideally be kept in an environment variable
const jwt_secret = "mynameisankush";

/**
 * Middleware function to fetch and verify the user from the JWT token.
 * If successful, it adds the user data to the request object.
 */
const fetchUser = (req, res, next) => {
    // Get the JWT token from the request header
    const token = req.header('jwt-token');
    
    // Check if the token exists
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    
    try {
        // Verify the token using the JWT secret
        const data = jwt.verify(token, jwt_secret);
        
        // Add the user data to the request object
        req.user = data.user;
        
        // Call the next middleware
        next();
    } catch (error) {
        // If token verification fails, send an authentication error response
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;
