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
            {
              username: 'thirdUser123',
              password: 'thirdUserPassword',
              email: 'thirdUser@gmail.com',
              firstname: 'Third',
              lastname: 'Thirdlast',
            },
            {
              username: 'fourthUser123',
              password: 'fourthUserPassword',
              email: 'fourthUser@gmail.com',
              firstname: 'Fourth',
              lastname: 'Fourthlast',
            },
            {
              username: 'fifthUser123',
              password: 'fifthUserPassword',
              email: 'fifthUser@gmail.com',
              firstname: 'Fifth',
              lastname: 'Fifthlast',
            },
            {
              username: 'sixthUser123',
              password: 'sixthUserPassword',
              email: 'sixthUser@gmail.com',
              firstname: 'Sixth',
              lastname: 'Sixthlast',
            },
            {
              username: 'seventhUser123',
              password: 'seventhUserPassword',
              email: 'seventhUser@gmail.com',
              firstname: 'Seventh',
              lastname: 'Seventhlast',
            },
            {
              username: 'eighthUser123',
              password: 'eighthUserPassword',
              email: 'eighthUser@gmail.com',
              firstname: 'Eighth',
              lastname: 'Eighthlast',
            },
            {
              username: 'ninthUser123',
              password: 'ninthUserPassword',
              email: 'ninthUser@gmail.com',
              firstname: 'Ninth',
              lastname: 'Ninthlast',
            },
            {
              username: 'tenthUser123',
              password: 'tenthUserPassword',
              email: 'tenthUser@gmail.com',
              firstname: 'Tenth',
              lastname: 'Tenthlast',
            }
          ];
          

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
              postdate: new Date(),
              likes: 3,
              comments: 4
            },
            {
              description: 'This is the second post on Jabber and I am really enjoying this site so far!',
              creatorId: 2,
              postdate: new Date(),
              likes: 31,
              comments: 14
            },
            {
              description: 'Just had an amazing meal at a new restaurant. Highly recommend!',
              creatorId: 3,
              postdate: new Date(),
              likes: 7,
              comments: 2
            },
            {
              description: 'Visited a beautiful beach today. The view was breathtaking!',
              creatorId: 4,
              postdate: new Date(),
              likes: 15,
              comments: 8
            },
            {
              description: 'Excited to announce that I got accepted into my dream university!',
              creatorId: 5,
              postdate: new Date(),
              likes: 23,
              comments: 10
            },
            {
              description: 'Had an amazing time hiking in the mountains. The scenery was stunning!',
              creatorId: 6,
              postdate: new Date(),
              likes: 9,
              comments: 3
            },
            {
              description: 'Just finished reading an incredible book. It kept me hooked until the last page!',
              creatorId: 7,
              postdate: new Date(),
              likes: 12,
              comments: 6
            },
            {
              description: 'Spent the day volunteering at a local shelter. It was a rewarding experience!',
              creatorId: 8,
              postdate: new Date(),
              likes: 5,
              comments: 1
            },
            {
              description: 'Attended a fascinating conference today. Learned so many new things!',
              creatorId: 9,
              postdate: new Date(),
              likes: 18,
              comments: 7
            },
            {
              description: 'Just adopted the most adorable puppy. My heart is full!',
              creatorId: 10,
              postdate: new Date(),
              likes: 27,
              comments: 12
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