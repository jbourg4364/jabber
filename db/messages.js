const client = require('./client');

async function createMessage({
    description,
    creatorId,
    senderId,
    subject
}) {
    try {
        const {rows: [message]} = await client.query(`
        INSERT INTO messages(description, "creatorId", "senderId", subject)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [description, creatorId, senderId, subject]);

        return message;
    } catch (error) {
        throw error; 
    }
};

async function getAllMessages(username) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM messages
        WHERE "creatorId" = $1 OR "senderId" = $1;
        `, [username]);

        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getAllMessages
}