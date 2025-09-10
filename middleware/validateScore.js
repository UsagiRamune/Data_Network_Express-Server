function validateScore(req, res, next) {
    const  { username, score } = req.body;

    if (typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ error: 'Invalid or missing username '});
    }

    if (typeof score !== 'number' || score < 0) {
        return res.status(400).json({ error: 'Score must be a non-negative number' });
    }

    next();
}

module.exports = validateScore;