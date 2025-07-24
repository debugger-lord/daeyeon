const fs = require("fs");
const path = require("path");
const pug = require("pug");

function indexHandler (stream, headers) {
    stream.respond({
        "content-type": "text/html; charset=UTF-8",
        ":status": 200,
    });
    stream.end(pug.renderFile(
        path.join(__dirname, "views/index.pug")
    ));
}
function userHandler (stream, headers) {
    stream.respond({
        "content-type": "text/html; charset=UTF-8",
        ":status": 200,
    });
    stream.end(pug.renderFile(
        path.join(__dirname, "views/user.pug"), {
            headers,
        }
    ));
}
function handler404 (stream, headers) {
    stream.respond({
        "content-type": "text/html; charset=UTF-8",
        ":status": 404,
    });
    stream.end("404");
}

module.exports = {indexHandler, userHandler, handler404};