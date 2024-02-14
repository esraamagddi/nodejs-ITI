const validateTodoInput = (req, res, next) => {
    if (!req.body ) {
        return res.status(400).json({ error: 'Text is required in the request body' });
    }

    next();

};

module.exports = validateTodoInput;
