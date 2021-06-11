console.log("index.js started");

const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/formresponses", (req, res) => {
        res.send(readJSONFile());
})

app.post("/formresponses", (req, res) => {
        const formres = readJSONFile();
        formres.push(req.body);
        writeJSONFile(formres);
        res.send(req.body);
})

app.put("/", (req, res) => {
    var contents = req.query.contents;

    var fresponses = readJSONFile();
    for(let i = 0; i < fresponses.length; i++) {
        if(fresponses[i].contents === contents) {
            fresponses[i] = req.body;
        }
    }

    writeJSONFile(fresponses);
    res.send(fresponses);
})

app.delete("/", (req, res) => {
    var contents = req.query.contents;

    var fresponses = readJSONFile();
    var newresps = [];
    for(let i = 0; i < fresponses.length; i++) {
        if(fresponses[i].contents !== contents) {
            newresps.push(fresponses[i]);
        }
    }

    writeJSONFile(newresps);
    res.send(newresps);
})

app.listen(port, () => {
        console.log("Asculta pe portul: ", port);
})

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("form.json"))["formresponses"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
fs.writeFileSync(
    "form.json",
    JSON.stringify({ formresponses: content }),
    "utf8",
    err => {
    if (err) {
        console.log(err);
    }
    }
);
}
