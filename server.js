// packages
const express = require('express');
const fs = require('fs');
const { v4: uuidv4} = require('uuid')

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


// routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
});

// new note function
app.post("/api/notes", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        const noteData = JSON.parse(data)
        noteData.push(newNote)
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData), function(err) {
            if (err) throw err;
            console.log("saved note");
     });
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })
});
// delete note function
app.delete("/api/notes/:id", (req, res) => {
    var clicked = req.params.id
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        const noteData = JSON.parse(data)
        const newData = noteData.filter(note => note.id !== clicked)
        fs.writeFileSync("./db/db.json", JSON.stringify(newData), function(err) {
            if (err) throw err;
            console.log("note removed");
        });
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })
})
// listener for port
app.listen(PORT, () => {
    console.log(`Using port ${PORT}!`);
});