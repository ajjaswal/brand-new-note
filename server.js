
const express = require('express');
const fs = require('fs');
const { v4: uuidv4} = require('uuid')

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});   

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});