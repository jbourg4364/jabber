const server = require('./app');

const PORT = process.env['PORT'] ?? 8080;
// const PORT = process.env['PORT'] ?? 3000;

server.listen(PORT, () => {
    console.log('Server is listening on PORT:', PORT);
});