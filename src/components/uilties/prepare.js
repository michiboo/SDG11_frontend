const { count } = require('console');
const fs = require('fs');
const { exit } = require('process');
var cities = require('../resource/cities500.json'); //(with path)
var countries = require('../resource/countries.json');
var cities_map = [];

for (const [key, value] of Object.entries(cities)) {
  cities_map.push({ title: value.name, lat: value.latitude, lon: value.longitude, iso: value.countrycode, population: value.population });
}

cities_map.forEach((x, i) => {
  for (const [key, value] of Object.entries(countries)) {
    if (value.iso == x["iso"]) {
      cities_map[i]['country'] = value.name;
      break;
    }
  }
});

const data = JSON.stringify(cities_map)

// write JSON string to a file
fs.writeFile('cities.json', data, err => {
  if (err) {
    throw err
  }
  console.log('JSON data is saved.')
})