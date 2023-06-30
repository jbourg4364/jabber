const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, getUserById, getUser, createPost } = require('../db');
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
        console.log('HERE')
        const { description, user } = req.body;
        
       
        
        const newPost = await createPost({description, creatorId: user, likes: 0, comments: 0});
        console.log(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});



module.exports = postsRouter;