function requireUser(req, res, next) {
    
    if (!req.user) {
        res.status(401);
        next({
            message: 'Unauthorized Error',
            name: 'Unauthorized Error',
            error: 'Unauthorized Error'
        })
    }
    next();
};

module.exports = { requireUser };