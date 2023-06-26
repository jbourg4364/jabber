const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;



async function createUser({
    username,
    password,
    email,
    firstname,
    lastname
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, email, firstname, lastname)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword, email, firstname, lastname]);

        return {
            id: user.id,
            username: user.username,
            password: hashedPassword,
        };
    } catch (error) {
        throw error;
    }
};

async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);

        return user;
    } catch (error) {
        throw error;
    }
};

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return {
        id: user.id,
        username: user.username,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE id = $1;
        `, [userId]);

        return user;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
};