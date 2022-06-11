const PORT = process.env.PORT || 8080;
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});   

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

