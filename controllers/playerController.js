const getPlayerById = (req, res) => {
    res.json({ id: req.params.id, name: 'PlayerOne' });
};

const submitScore = (req, res) => {
    const { username, score } = req.body;
    res.status(201).json({ message: 'Score submitted', username, score });
};

module.exports = {
    getPlayerById,
    submitScore
};