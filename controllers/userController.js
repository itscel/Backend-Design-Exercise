const fs = require('fs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const path = require('path');
const { genericError } = require('../responses/responses');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = require(usersFilePath);

// Validation schemas
const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });
};

// Register a new user
exports.register = (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = users.find(u => u.username === req.body.username);
    if (existingUser) return res.status(400).send('Username already taken.');

    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.status(201).send('User registered successfully!');
    } catch (err) {
        genericError(res, err);
    }
};

exports.login = (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Searches the user by username and password
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (!user) return res.status(401).send('Invalid credentials.');

    //Generate the token
    const token = generateToken(user);

    //Returns a token along with the user's id, username, and email
    res.send({
        token,
        id: user.id,
        username: user.username,
        email: user.email
    });
};


//Retrieving user profile
exports.getProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).send('User not found.');

    const { password, ...userProfile } = user; 
    res.send(userProfile);
};
