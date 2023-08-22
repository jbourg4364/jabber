const express = require('express');
const postsLikesRouter = express.Router();
const { getLikedPostsByUser } = require('../db');

postsLikesRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const response = await getLikedPostsByUser(userId);
       

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = postsLikesRouter;