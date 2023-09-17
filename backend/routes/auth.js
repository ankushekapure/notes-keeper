const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const jwt_secret = "mynameisankush";

// Route 1: Create a user using POST for the endpoint "/api/auth/createuser" - No Login Required
router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('password', 'Enter a valid password').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail(),
    ],
    async (req, res) => {
        let success = false;
        // If there are errors, return a bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check if the email already exists in the database
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, errors: "Sorry, User With This Email Already Exists" });
            }

            // Create a salt for password hashing
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });

            const userData = {
                user: { id: user.id }
            };

            const jwttoken = jwt.sign(userData, jwt_secret);
            success = true;
            res.json({ success, jwttoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occurred");
        }
    }
);

// Route 2: Login user - No Login Required
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').exists(),
    ],
    async (req, res) => {
        let success = false;
        // If there are errors, return a bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success = false;
                return res.status(400).json({ success, errors: "Please Enter Correct Credentials" });
            }

            // Compare the entered password with the hashed password in the database
            const comparePass = await bcrypt.compare(password, user.password);
            if (!comparePass) {
                success = false;
                return res.status(400).json({ success, errors: "Please Enter Correct Credentials" });
            }

            const userData = {
                user: { id: user.id }
            };
            const jwttoken = jwt.sign(userData, jwt_secret);
            success = true;
            res.json({ success, jwttoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

// Route 3: Get logged-in user details - Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
});

module.exports = router;