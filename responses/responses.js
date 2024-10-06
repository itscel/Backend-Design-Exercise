const genericError = (res, error) => {
    const status = error?.status || 500;
    const message = error?.message || 'Internal Server Error';
    res.status(status).json({
        status,
        message
    });
};

module.exports = {
    genericError
};
