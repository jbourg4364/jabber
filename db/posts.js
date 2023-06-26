const client = require('./client');



async function createPost({
    description,
    creatorId,
    likes,
    comments
}) {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO posts(description, "creatorId", likes, comments)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [description, creatorId, likes, comments]);

        return post;
    } catch (error) {
        throw error;
    }
};

async function getAllPosts() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM posts;
        `);

        return rows;
    } catch (error) {
        throw error;
    };
};

async function getPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM posts
        WHERE "creatorId" = $1;
        `, [userId]);

        return rows;
    } catch (error) {
        throw error;
    }
};

async function deletePost(postId) {
    try {
        await client.query(`
        DELETE FROM posts
        WHERE id = $1;
        `, [postId]);
    } catch (error) {
        throw error; 
    }
};

async function editPost(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1 }`).join(', ');

    if (setString === 0) {
        return;
    };
    
    try {
        const { rows: [post] } = await client.query(`
        UPDATE posts
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
        `, Object.values(fields));

        return post;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createPost,
    getPostsByUser,
    getAllPosts,
    deletePost,
    editPost
}