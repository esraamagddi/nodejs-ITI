const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleRequest } = require('../routes');
const {serveStaticFile}=require('../handlers/handleviews');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url } = req;

    if (url.startsWith('/public/css/')) {
        const cssFilePath = path.join(__dirname, '..', url);      
          serveStaticFile(res, cssFilePath, 'text/css');
    } 
    else if (url.startsWith('/public/imgs/')) {
        const imagePath = path.join(__dirname, '..', url);
            serveStaticFile(res, imagePath, 'image/jpeg'); //image/jpeg
    } 
    else {
        handleRequest(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






























// const http = require('http');
// const { handleRequest } = require('./routes');

// const PORT = 3000;

// const server = http.createServer(handleRequest);

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });