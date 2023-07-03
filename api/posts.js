const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, getUserById, getUser, createPost, increaseLikes, getPostById } = require('../db');
const {requireUser} = require('./utils');



postsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.send(posts);
    } catch (error) {
        next(error);
    }
});

postsRouter.post('/', async (req, res, next) => {
    try {
  
        const { description, user } = req.body;
        const newPost = await createPost({description, creatorId: user, likes: 0, comments: 0});

        console.log(newPost);
        
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

postsRouter.post('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await getPostById(id)
        console.log(post.likes)
        const like = await increaseLikes(post.id);

        console.log(like);
        res.status(201).json(like);
    } catch (error) {
        next(error);
    }
})

module.exports = postsRouter;