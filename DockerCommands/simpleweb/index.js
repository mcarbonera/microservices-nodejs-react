const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello there o/</h1>');
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});