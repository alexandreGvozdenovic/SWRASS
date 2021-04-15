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

/************* GET home page. *************/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/************* POST LOGIN AS LUKE SKYWALKER *************/
router.post('/sign-in', function(req, res, next) {
  if(req.body.identificationFromFront === identification && req.body.passwordFromFront === password) {
    res.json({authorized: true, name: identification});
  } else {
    res.json({authorized: false});
  }
});

/************* GET GET THE API RESULTS FROM USER RESEARCH *************/
router.get('/search', async function(req, res, next) {
  let people = [];
  let planets = [];
  let films = [];
  let species = [];
  let vehicles = [];
  let starships = [];

  // fetch people
  people = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/people/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // fetch planets
  planets = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/planets/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // fetch films
  films = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/films/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // fetch species
  species = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/species/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // fetch vehicles
  vehicles = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/vehicles/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })
  // fetch starships
  starships = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/starships/?search=${req.query.search}`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({people, planets, films, species, vehicles, starships});
});

/************* GET ALL PLANETS *************/
router.get('/planets', async function(req, res, next) {
  let planets = [];

  // fetch planets
  planets = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/planets/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({planets});
});

/************* GET ALL INFORMATION ON A SINGLE PLANET *************/
router.get('/planet', async function(req, res, next) {
  let planetFromFront = JSON.parse(req.query.planetFromFront);
  let populatedPlanet = planetFromFront;

  // fetch residents
  let residentsPromises = [];
  for(resident of planetFromFront.residents) {
    residentsPromises.push(
      fetch(resident)
      .then(response => response.json())
      );
  }
  const residents = await Promise.all(residentsPromises)

  // fetch films
  let filmsPromises = [];
  for(film of planetFromFront.films) {
    filmsPromises.push(
      fetch(film)
      .then(response => response.json())
      );
  }
  const films = await Promise.all(filmsPromises)

  populatedPlanet.residents = residents
  populatedPlanet.films = films
  console.log(populatedPlanet);


  res.json({populatedPlanet});
});

/************* GET ALL PEOPLE *************/
router.get('/people', async function(req, res, next) {
  let people = [];

  // fetch planets
  people = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/people/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({people});
});

/************* GET ALL INFORMATION ON A SINGLE PERSON *************/
router.get('/person', async function(req, res, next) {
  let personFromFront = JSON.parse(req.query.personFromFront);
  let populatedPerson = personFromFront;

  // fetch homeworld
  const homeworld = await fetch(personFromFront.homeworld).then(response => response.json());
  // fetch films
  let filmsPromises = [];
  for(film of personFromFront.films) {
    filmsPromises.push(
      fetch(film)
      .then(response => response.json())
      );
  }
  const films = await Promise.all(filmsPromises)
  // fetch species
  let speciesPromises = [];
  for(specie of personFromFront.species) {
    speciesPromises.push(
      fetch(specie)
      .then(response => response.json())
      );
  }
  const species = await Promise.all(speciesPromises)
  // fetch vehicles
  let vehiclesPromises = [];
  for(vehicle of personFromFront.vehicles) {
    vehiclesPromises.push(
      fetch(vehicle)
      .then(response => response.json())
      );
  }
  const vehicles = await Promise.all(vehiclesPromises)
  // fetch starships
  let starshipsPromises = [];
  for(starship of personFromFront.starships) {
    starshipsPromises.push(
      fetch(starship)
      .then(response => response.json())
      );
  }
  const starships = await Promise.all(starshipsPromises)
  
  populatedPerson.homeworld = homeworld;
  populatedPerson.films = films;
  populatedPerson.species = species;
  populatedPerson.vehicles = vehicles;
  populatedPerson.starships = starships;

  res.json({populatedPerson});
});

/************* GET ALL FILMS *************/
router.get('/films', async function(req, res, next) {
  let films = [];

  // fetch planets
  films = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/films/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({films});
});

module.exports = router;
