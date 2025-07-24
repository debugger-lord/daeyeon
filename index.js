const http2 = require("http2");
const fs = require("fs");
const path = require("path");

const router = require(path.join(__dirname, "routes/router.js"));

// app:
const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, "certificate/localhost-privkey.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certificate/localhost-cert.pem")),
});
server.on("error", console.log);
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("stream", (stream, headers) => {
    headers._pathPoints = (headers[":path"]).slice(1).split("/");

    // router:
    if (headers[":path"] === "/")
        return router.indexHandler(stream, headers);
    if (headers._pathPoints[0] === "user")
        return router.userHandler(stream, headers);
    return router.handler404(stream, headers);
})