const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db');

// router.use(async (req, res, next) => {
  
//     const prefix = 'Bearer';
//     const auth = req.header('Authorization');

//     if (!auth) {
//         next();
//     } else if (auth.startsWith(prefix)) {
//         const token = auth.slice(prefix.length);
//         try {
//             const { id } = jwt.verify(token, JWT_SECRET);
//             req.user = await getUserById(id);
//             next();
//         } catch ({ message, name }) {
//             next({
//                 message,
//                 name
//             });
//         }
//     } else {
//         next ({
//             message: 'Authorization Error',
//             name: 'AuthorizationError'
//         });
//     }
// });

router.use((req, res, next) => {
    if (req.user) {
        console.log('User is set:', req.user);
    }
    next();
});


// HEALTH
router.get('/health', async (req, res, next) => {
    res.send({ 
        message: 'Server is healthy',
        status: 200
     });
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/posts
const postsRouter = require('./posts');
router.use('/posts', postsRouter);

router.use('/', (req, res, next) => {
    res.status(404);
    res.send(
        next({
            message: 'Page Not Found',
            name: 'Page Not Found',
            error: 'Page Not Found'
        })
    )
});

// Error Handler
router.use((error, req, res, next) => {
    res. send({
        message: error.message,
        name: error.name,
        error: error.error
    })
});



module.exports = router;