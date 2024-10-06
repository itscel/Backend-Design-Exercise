const jwt = require('jsonwebtoken');
const { genericError } = require('../responses/responses');

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = decoded;
        next();
    } catch (err) {
        return genericError(res, new Error('Invalid token.'));
    }
};

module.exports = authenticateMiddleware;
