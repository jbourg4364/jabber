const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { requireUser } = require('./utils');
const { createUser, getUserByUsername } = require('../db');



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



module.exports = usersRouter;

