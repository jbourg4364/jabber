const express = require('express');
const postsCommentsRouter = express.Router();
const { addComment, getAllCommentsByPost } = require('../db');


postsCommentsRouter.get('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    try {
        const comments = await getAllCommentsByPost(postId);
        if (!comments) {
            return;
        };

        res.send(comments);
    } catch (error) {
        next(error)
    }
});

postsCommentsRouter.post('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;
    try {
        const response = await addComment({postId, userId: user.id, comment});

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});


module.exports = postsCommentsRouter;
