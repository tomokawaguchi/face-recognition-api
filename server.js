const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // local host default
      user : 'tomoko',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'Henry',
//             email: 'henry@gmail.com',
//             password: 'henry',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '125',
//             name: 'Kenchan',
//             email: 'kenchan@gmail.com',
//             password: 'dogfood',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', ((req, res) => { register.handleRegister(req, res, db, bcrypt) }))

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) });

app.listen(3000, () => {
    console.log('app is running on the port 3000');
});



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


/*
/ --> res = thi is working
/signin --> POST = success / fail
(This is not PUT because pw should be hidden from the query url e.g form submission)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/