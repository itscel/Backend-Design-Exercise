const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const rateLimiter = require('./middleware/rateLimiter');
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/users', rateLimiter, userRoutes);


// Default Route
app.get('/', rateLimiter, (req, res) => {
    res.send('Welcome to the Node.js Backend Application');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
