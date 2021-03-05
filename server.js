const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client     : 'pg',
	connection : {
		host     : '127.0.0.1', //localhost
		user     : 'postgres', //add your user name for the database here
		password : 'postgres', //add your correct password here
		database : 'neural-magic', //add your database name here
	},
});

const app = express();

const port = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('success'));
app.post('/signin', signin.handleSignIn(db, bcrypt)); // req, res called inside signin
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db)); // req, res called in profile
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || port, () => console.log(`Server is running on port ${process.env.PORT}`));
