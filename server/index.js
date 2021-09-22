// Other imports
const chalk = require('chalk');
const path = require('path');

// Express initialization
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.json({ limit: '1mb' }));

// Port variable
const PORT = 3000;

let currentRole = 'none';
// Routes
// Login page
// Dodaj middleware, ki preveri, če je že kak user role in v primeru, da je preusmeri nazaj.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.post('/', (req, res, next) => {
  currentRole = req.body;
  next();
});

// Commision's pages
app.get('/playerCommision', (req, res) => {
  res.sendFile(__dirname + '/html/playerCommision.html');
});
app.get('/playersTable', (req, res) => {
  res.sendFile(__dirname + '/html/playersTable.html');
});
app.get('/gameHistory', (req, res) => {
  res.sendFile(__dirname + '/html/gameHistory.html');
});

// Judges' pages
app.get('/matchDashboard', (req, res) => {
  res.sendFile(__dirname + '/html/matchDashboard.html');
});

app.get('/zapisnik', (req, res) => {
  res.sendFile(__dirname + '/html/zapisnik.html');
});

// Official user creation page
app.get('/addOfficial', (req, res) => {
  res.sendFile(__dirname + '/html/addOfficial.html');
});

// Response route for checking user function
app.get('/checkRole', (req, res) => {
  if (currentRole == 'none') {
    res.json('none');
  } else {
    console.log(currentRole.role);
    res.json(currentRole.role);
  }
});

// Listening function
app.listen(PORT, () => {
  console.log(chalk.bold.white('listening on port ') + chalk.bold.yellow(PORT));
});
