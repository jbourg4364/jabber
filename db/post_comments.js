const client = require('./client');

async function addComment ({ postId, userId, comment }) {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO post_comments("postId", "userId", comment)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [postId, userId, comment]);

        return post;
    } catch (error) {
        throw error;
    }
};

async function getAllCommentsByPost (postId) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM post_comments
        WHERE "postId" = $1;
        `, [postId]);

        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { addComment, getAllCommentsByPost };