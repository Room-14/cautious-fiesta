const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

//view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb://localhost/AttendanceApp"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
    .then(() => { app.listen(PORT, console.log(`Server started on port ${PORT} and MongoDB Connected...`)) })
    .catch((error) => { console.log(error) });


// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.get('/appAttendash', (req, res) => res.render('appAttendash'));
app.use(authRoutes)