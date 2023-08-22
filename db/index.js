module.exports = {
    ...require('./client'),
    ...require('./users'),
    ...require('./posts'),
    ...require('./messages'),
    ...require('./posts_likes'),
    ...require('./post_comments')
}