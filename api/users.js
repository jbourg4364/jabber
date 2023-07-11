const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { createUser, getUserByUsername, getUserById, getAllUsers, getPostsByUser, getPostById, deletePost, editPost, createMessage, getAllMessages } = require('../db');

const requireUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        
        const user = await getUserById(decoded.id);
        
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({
            error: 'InvalidCredentialsError',
            message: 'Invalid token',
          });
        }
      } catch (error) {
        res.status(401).json({
          error: 'UnauthorizedError',
          message: 'You must be logged in to perform this action',
          name: 'UnauthorizedError',
        });
      }
};

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, email, firstname, lastname } = req.body;

    if (password.length < 8) {
        console.error('Password must be 8 characters in length');

        return res.status(400).json({
            name: 'IncorrectPasswordLength',
            message: 'Incorrect Password Length',
            error: 'IncorrectPasswordLength'
        })
    };

    try {
        const existingUser = await getUserByUsername(username);
        
        if (existingUser) {
            return res.status(409).json({
                name: 'UserTaken',
                message: 'Username is already used',
                error: 'UsernameTaken'
            });
        };

        const newUser = await createUser({ username, password, email, firstname, lastname });

        if (newUser) {
            const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '24h' });

            res.status(201).json({
                message: 'User registered successfully!',
                token: token,
                user: {
                    id: newUser.id,
                    username: newUser.username
                }
            })
        };
    } catch (error) {
        next(error);
    }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            res.status(401).json({
                error: 'InvalidCredentialsError',
                message: 'Invalid username or password!',
            });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                res.status(401).json({
                    error: 'InvalidCredentialsError',
                    message: 'Invalid username or password',
                });
            } else {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                }, SECRET, { expiresIn: '24h' });

                res.status(200).json({
                    message: `You're logged in!`,
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                    },

                    
                });
            }
        };
    } catch (error) {
        next(error);
    }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
});


usersRouter.get("/", async (req, res, next) => {
  try {
    const response = await getAllUsers();

    res.send(response);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/profile/:username', requireUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);

        if(!user) {
            return res.status(400).json({
                error: 'UserNotFound',
                message: `User ${username} not found`
            });
        };

        res.send(user);


    } catch (error) {
        next(error);
    }
  });

  usersRouter.delete('/profile/:postId', requireUser, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await getPostById(postId);
        console.log(post)

        if(!post) {
            return res.status(404).json({
                error: 'NotFoundError',
                message: 'Post not found'
            });
        }
       
        if(post.creatorId !== req.user.username) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'User is not allowed to delete this post'
            });
        }

        const deletedPost = await deletePost(postId);
        

        res.status.json(deletedPost);
    } catch (error) {
        next(error);
    }
  });

  usersRouter.patch('/profile/:postId', requireUser, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await getPostById(postId);
     
        if(!post) {
            return res.status(200).json({
                error: 'NotFoundError',
                message: 'Post not found',
            })
        };

        if(post.creatorId !== req.user.username) {
            return res.status(403).json({
                error: 'ForbiddenError',
                message: 'User is not allowed to update this post',
            })
        };

        const { description } = req.body;
        const updatePost = await editPost(postId, description);
        
        res.status(200).json(updatePost);
    } catch (error) {
        next(error);
    }
  });

  usersRouter.get('/messages/:username', requireUser, async(req, res, next) => {
    try {
        const { username } = req.params;
        const messages = await getAllMessages(username);
        
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
  });

  usersRouter.post('/messages/:username', requireUser, async(req, res, next) => {
    try {
        const { username } = req.params;
        const { description, senderId, subject } = req.body;

        const response = await createMessage({description: description, creatorId: username, senderId: senderId, subject: subject});

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
  });
  





module.exports = usersRouter;

