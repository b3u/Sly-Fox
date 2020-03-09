const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
// const passport = require('passport');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// Passport Config
// require('./auth/passport')(passport);


// Configure `.env`
require('dotenv').config();


// Connect to MongoDB
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))


// Set rendering engine
app.set('view engine', 'pug')


/** Middleware **/

// Serve static Assets
app.use(express.static(path.join(__dirname, 'public')))


// Bodyparser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());


// Connect Flash
app.use(flash());


// Global Vars



/** Routes **/
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));
// app.use('/admin', require('./routes/admin'));
// app.use('/auth', require('./routes/auth'));


// 404 Handler
app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find that!")
})


/** Run server **/
const server = app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})

// Handle remy/nodemon#1463
process.once("SIGUSR2", () => {
    process.kill(process.pid, 'SIGUSR2');
    server.close();
})