'use strict';
console.clear();

// dependencies
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

// middlewear
hbs.registerPartials(__dirname + '/views/patrial');
app.set('view engine', 'hbs');

// logger
app.use((req, res, next) => {
    var log = `${new Date().toString()}: ${req.method}, ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to appedn to server.log');
        }
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('wip.hbs');
// });

app.use(express.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
});

// routes
app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'home page',
        content: 'welcome msg',
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'about',
        content: 'content here',
    });
});

// listener
app.listen(port, () => {
    console.log(`Rozpoczeto nasluchiwanie na porcie ${port}.`);
});