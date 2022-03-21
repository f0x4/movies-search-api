require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { connect, close, autocomplete, search } = require("./mongo/db");
// const main = require("./mongoose");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/autocomplete/:autocompleteQuery", function (req, res) {
    const query = decodeURI(req.params.autocompleteQuery);

    const globalStartTime = new Date();

    autocomplete(query).then((results) => {
        res.send(results);
        console.log(
            "Общее время " + (new Date() - globalStartTime) / 1000 + "s"
        );
    });
});

app.get("/search/:searchQuery", function (req, res) {
    const page = req.query.page;
    const query = decodeURI(req.params.searchQuery);

    const globalStartTime = new Date();

    search(query, page).then((results) => {
        res.send(results);
        console.log(
            "Общее время " + (new Date() - globalStartTime) / 1000 + "s"
        );
    });
});

app.listen(port, () => {
    cors();
    console.log("server started");
    connect();
});

process.on("SIGINT", function () {
    close().then(() => process.exit());
});
