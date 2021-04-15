const { response, json } = require('express');
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const identification = 'Luke';
const password = 'DadSucks';

// HELPER

const getData = (url, array, resolve, reject) => {
    fetch(url)
    .then(response => response.json())
    .then(response => {
      const retrivedData = array.concat(response.results)
      if (response.next !== null) {
        getData(response.next, retrivedData, resolve, reject)
      } else {
        resolve(retrivedData);
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST login information */
router.post('/sign-in', function(req, res, next) {
  if(req.body.identificationFromFront === identification && req.body.passwordFromFront === password) {
    res.json({authorized: true, name: identification});
  } else {
    res.json({authorized: false});
  }
});

/* GET Get the API results. */
router.get('/search', async function(req, res, next) {

  let people = [];
  let planets = [];
  let films = [];
  let species = [];
  let vehicles = [];
  let starships = [];

  // GET PEOPLE
  people = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/people/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // GET PLANETS
  planets = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/planets/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // GET FILMS
  films = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/films/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // GET SPECIES
  species = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/species/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // GET VEHICLES
  vehicles = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/vehicles/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // GET STARSHIPS
  starships = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/starships/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({people, planets, films, species, vehicles, starships});
});

module.exports = router;
