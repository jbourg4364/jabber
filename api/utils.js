const { getUserById } = require('../db')

const requireUser = async(req, res, next) => {
  console.log('HERE')
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

module.exports = { requireUser };