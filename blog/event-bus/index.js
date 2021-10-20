const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const logError = (err) => {
    if(err && err.response && err.response.status && err.response.statusText) {
        console.log(`${err.response.status} - ${err.response.statusText}`)
    } else {
        console.log(`Um erro inesperado ocorreu. Código ${err.code}`)
        //console.log(err)
    }
}

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch(err => logError(err));
    axios.post('http://localhost:4001/events', event).catch(err => logError(err));
    axios.post('http://localhost:4002/events', event).catch(err => logError(err));
    axios.post('http://localhost:4003/events', event).catch(err => logError(err));

    res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Listening on 4005')
});