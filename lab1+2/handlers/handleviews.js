const fs = require('fs');
const path = require('path');

function handleHome(req, res) {
    const readStream = fs.createReadStream(path.join(__dirname, '..', 'todo.json'), 'utf8');
    readStream.on('error', (err) => {
        console.error('Error reading todo.json:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    readStream.on('open', () => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <html>
        <head>
            <title>TODO List</title>
            <link rel="stylesheet" type="text/css" href="../public/css/style.css">
        </head>
        <body>
            <h1>TODO List</h1>
            <ul>
    `);        
    // res.write('<ul>');//ul 
    });

    readStream.on('data', (chunk) => {
        const todos = JSON.parse(chunk);
        todos.forEach(todo => {
            res.write(`<li>${todo.text}</li>`);
        });//read file--->then parse--filesynic
    });

    readStream.on('end', () => {
        res.write('</ul>');
        res.end();
    });
}


function handleAstronomy(req, res) {
    const astronomyFilePath = path.join(__dirname ,'..', 'views', 'astronomy.html');
    const readStream = fs.createReadStream(astronomyFilePath, 'utf8');

    readStream.on('error', (err) => {
        console.error('Error reading astronomy.html:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    readStream.on('open', () => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
    });

    readStream.pipe(res); 
    
}


function handleNotFound(req, res) {
    const notFoundFilePath = path.join(__dirname, '..', 'views', 'notfound.html');

    const readStream = fs.createReadStream(notFoundFilePath, 'utf8');

    readStream.on('error', (err) => {
        console.error('Error reading notfound.html:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    readStream.on('open', () => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
    });

    readStream.pipe(res); 
}
function handleAstronomyDownload(req, res) {
    const filePath = path.join(__dirname, '..', 'public', 'imgs', 'astronomy.jpg');
        const fileName = 'imgs/astronomy.jpg'; 
    
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-type', 'image/jpg');
    
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}

function serveStaticFile(res, filePath, contentType) {
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => {
        console.error(`Error reading file ${filePath}:`, err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    res.writeHead(200, { 'Content-Type': contentType });
    fileStream.pipe(res);
}

module.exports = { handleHome, handleAstronomy, handleNotFound,handleAstronomyDownload ,serveStaticFile};
