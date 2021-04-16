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

/************* GET ALL SPECIES *************/
router.get('/species', async function(req, res, next) {
  let species = [];

  // fetch species
  species = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/species/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({species});
});

/************* GET ALL INFORMATION ON A SINGLE PERSON *************/
router.get('/specie', async function(req, res, next) {
  let specieFromFront = JSON.parse(req.query.specieFromFront);
  let populatedSpecie = specieFromFront;

  // fetch homeworld
  const homeworld = await fetch(specieFromFront.homeworld).then(response => response.json());
  // fetch films
  let filmsPromises = [];
  for(film of specieFromFront.films) {
    filmsPromises.push(
      fetch(film)
      .then(response => response.json())
      );
  }
  const films = await Promise.all(filmsPromises)
  // fetch people
  let peoplePromises = [];
  for(person of specieFromFront.people) {
    peoplePromises.push(
      fetch(person)
      .then(response => response.json())
      );
  }
  const people = await Promise.all(peoplePromises)
  
  populatedSpecie.homeworld = homeworld;
  populatedSpecie.films = films;
  populatedSpecie.people = people;

  res.json({populatedSpecie});
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

/************* GET ALL INFORMATION ON A SINGLE FILM *************/
router.get('/film', async function(req, res, next) {
  let filmFromFront = JSON.parse(req.query.filmFromFront);
  let populatedFilm = filmFromFront;

  // fetch characters
  let charactersPromises = [];
  for(character of filmFromFront.characters) {
    charactersPromises.push(
      fetch(character)
      .then(response => response.json())
      );
  }
  const characters = await Promise.all(charactersPromises)
  // fetch planets
  let planetsPromises = [];
  for(planet of filmFromFront.planets) {
    planetsPromises.push(
      fetch(planet)
      .then(response => response.json())
      );
  }
  const planets = await Promise.all(planetsPromises)
  // fetch species
  let speciesPromises = [];
  for(specie of filmFromFront.species) {
    speciesPromises.push(
      fetch(specie)
      .then(response => response.json())
      );
  }
  const species = await Promise.all(speciesPromises)
  // fetch vehicles
  let vehiclesPromises = [];
  for(vehicle of filmFromFront.vehicles) {
    vehiclesPromises.push(
      fetch(vehicle)
      .then(response => response.json())
      );
  }
  const vehicles = await Promise.all(vehiclesPromises)
  // fetch starships
  let starshipsPromises = [];
  for(starship of filmFromFront.starships) {
    starshipsPromises.push(
      fetch(starship)
      .then(response => response.json())
      );
  }
  const starships = await Promise.all(starshipsPromises)
  
  populatedFilm.planets = planets;
  populatedFilm.characters = characters;
  populatedFilm.species = species;
  populatedFilm.vehicles = vehicles;
  populatedFilm.starships = starships;

  res.json({populatedFilm});
});

/************* GET ALL VEHICLES *************/
router.get('/vehicles', async function(req, res, next) {
  let vehicles = [];

  // fetch vehicles
  vehicles = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/vehicles/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({vehicles});
});

/************* GET ALL INFORMATION ON A SINGLE VEHICLE *************/
router.get('/vehicle', async function(req, res, next) {
  let vehicleFromFront = JSON.parse(req.query.vehicleFromFront);
  let populatedVehicle = vehicleFromFront;

  // fetch pilots
  let pilotsPromises = [];
  for(pilot of vehicleFromFront.pilots) {
    pilotsPromises.push(
      fetch(pilot)
      .then(response => response.json())
      );
  }
  const pilots = await Promise.all(pilotsPromises)

  // fetch films
  let filmsPromises = [];
  for(film of vehicleFromFront.films) {
    filmsPromises.push(
      fetch(film)
      .then(response => response.json())
      );
  }
  const films = await Promise.all(filmsPromises)

  populatedVehicle.pilots = pilots;
  populatedVehicle.films = films;


  res.json({populatedVehicle});
});

/************* GET ALL STARSHIPS *************/
router.get('/starships', async function(req, res, next) {
  let starships = [];

  // fetch starships
  starships = await new Promise((resolve, reject) => {
    getData(`https://swapi.dev/api/starships/`, [], resolve, reject)
  })
  .then(response => {
    return response;
  })

  res.json({starships});
});

/************* GET ALL INFORMATION ON A SINGLE STARSHIP *************/
router.get('/starship', async function(req, res, next) {
  let starshipFromFront = JSON.parse(req.query.starshipFromFront);
  let populatedStarship = starshipFromFront;

  // fetch pilots
  let pilotsPromises = [];
  for(pilot of starshipFromFront.pilots) {
    pilotsPromises.push(
      fetch(pilot)
      .then(response => response.json())
      );
  }
  const pilots = await Promise.all(pilotsPromises)

  // fetch films
  let filmsPromises = [];
  for(film of starshipFromFront.films) {
    filmsPromises.push(
      fetch(film)
      .then(response => response.json())
      );
  }
  const films = await Promise.all(filmsPromises)

  populatedStarship.pilots = pilots;
  populatedStarship.films = films;


  res.json({populatedStarship});
});

module.exports = router;
