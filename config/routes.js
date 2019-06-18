const axios = require('axios');
const bcrypt = require('bcryptjs')

const tokenService = require('../auth/token-service')

const { authenticate } = require('../auth/authenticate');


const DatabaseModel = require('../model/model')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let person = req.body;
  console.log(person)
  const hash = bcrypt.hashSync(person.password, 10);
  person.password = hash;
  console.log(person)

  DatabaseModel.add(person)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
  // console.log('hi mom')
  // res.status(201).json({ message: 'Outkast'});
  
  // implement user registration
}

function login(req, res) {
  let {username, password} = req.body;
  
  DatabaseModel.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          // roles: token.roles,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });

  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      console.log(response)
      res.status(200).json(response.data.results,);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
