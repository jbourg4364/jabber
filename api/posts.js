const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');



postsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.send(posts);
    } catch (error) {
        next(error);
    }
});


module.exports = postsRouter;