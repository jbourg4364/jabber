const client = require('./client');
const { createUser, createPost } = require('.');


async function dropTables() {
    console.log('Dropping all tables...');
    try {
        await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        `);
    } catch (error) {
        throw error;
    }
};

async function createTables() {
    console.log('Creating all tables...');
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL
        );

        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL,
            "creatorId" INTEGER REFERENCES users(id),
            postdate TIMESTAMP DEFAULT NOW(),
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT true
        )
        `);
        console.log('Finished creating all tables...')
    } catch (error) {
        console.log(error);
    }
};

async function createInitialUsers() {
    console.log('Creating initial users...')
    try {
        const usersToCreate = [
            {
                username: 'firstUser123',
                password: 'firstUserPassword',
                email: 'firstUser@gmail.com',
                firstname: 'First',
                lastname: 'Last',
            },
            {
                username: 'secondUser123',
                password: 'secondUserPassword',
                email: 'secondUser@gmail.com',
                firstname: 'Second',
                lastname: 'Secondlast',
            },
        ]

        const users = await Promise.all(usersToCreate.map(createUser));

        console.log('Users created:', users)
    } catch (error) {
        throw error; 
    }
};

async function createInitialPost() {
    console.log('Creating post...');
    try {
        const postsToCreate = [
            {
                description: 'This is the first post on Jabber and I love it!',
                creatorId: 1,
                postdate: new Date,
                likes: 3,
                comments: 4
            },
            {
                description: 'This is the second post on Jabber and I am really enjoying this site so far!',
                creatorId: 2,
                postdate: new Date,
                likes: 31,
                comments: 14
            }
        ];

        const post = await Promise.all(postsToCreate.map(createPost));

        console.log('Post created...', post);
    } catch (error) {
        throw error;
    }
};

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPost();
    } catch (error) {
        console.log('Error during rebuildDB');
        throw error;
    }
};



module.exports = {
    rebuildDB
};