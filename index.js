const path = require('path');
const fs = require('fs');

const express = require('express');
const pug = require('pug');

// !APP:

const app = express();
app.listen(8000);

app.set("view engine", "pug");
app.set("views", __dirname + "/routes/views");

// default post
app.use(express.urlencoded({ extended: true, }));
// AJAX post
app.use(express.json());

// routes:

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/reg", (req, res) => {
    res.render("reg");
}).post("/reg", (req, res) => {
    if (req.query.method !== "post") return;
    const isOk = {
        nickname: {isFree: true,},
        password: {
            lengthOk: req.body.password.length > 12,
            doesMatch: req.body.password === req.body.password1,
        },
        yes() {
            return this.nickname.isFree && this.password.lengthOk && this.password.doesMatch;
        },
    };
    console.log(isOk.yes());
    res.json(isOk);

    if (!isOk.yes()) return;

});
app.get("/auth", (req, res) => {
    res.render("auth");
}).post("/auth", (req, res) => {
    if (req.query.method !== "post") return;
    const isOk = {
        nickname: {doesExist: true,},
        password: {isCorrect: true,},
    };
    res.json(req.body);
});
app.get("/user/:user", (req, res) => {
    res.render("user", req.params);
});

app.get((req, res) => {
    res.render("404");
})