const path = require('path');
const fs = require('fs');

const express = require('express');
const pug = require('pug');

// app:

const app = express();
app.listen(8000);

app.set("view engine", "pug");
app.set("views", __dirname + "/routes/views");

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/auth", (req, res) => {
    res.render("auth");
});
app.get("/user/:user", (req, res) => {
    res.render("user", req.params);
});