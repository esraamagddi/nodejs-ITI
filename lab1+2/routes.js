const fs = require('fs');
const path = require('path');
const { handleHome, handleAstronomy, handleNotFound, handleAstronomyDownload } = require('./handlers/handleviews');

function handleRequest(req, res) {
    if (req.url === '/') {
        handleHome(req, res);
    } else if (req.url === '/astronomy') {
        handleAstronomy(req, res);
    } else if(req.url=='/astronomy/download') 
    {
        handleAstronomyDownload(req,res);
    }
    else {
        handleNotFound(req, res);
    }
}
module.exports={ handleRequest};