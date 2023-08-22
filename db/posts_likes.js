const client = require('./client');


async function getPostsLikesById(postId) {
    try {
        const { rows: [likes] } = await client.query(`
        SELECT * FROM posts_likes
        WHERE "postId" = $1;
        `, [likes]);

        return likes;
    } catch (error) {
        throw error;
    }
};

async function joinLikesAndPosts(postId, userId) {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO post_likes("postId", "userId")
        VALUES ($1, $2)
        RETURNING *;
        `, [postId, userId]);
     
        return post;
    } catch (error) {
        throw error;
    }
};

async function getLikedPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM post_likes
        WHERE "userId" = $1;
        `, [userId]);

        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = { joinLikesAndPosts, getLikedPostsByUser }