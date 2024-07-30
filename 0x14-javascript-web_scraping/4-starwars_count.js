#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./4-starwars_count.js <API_URL>');
  process.exit(1);
}

const apiUrl = process.argv[2];
const characterId = '18';

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error(`Error: ${response.statusCode}`);
  } else {
    const films = JSON.parse(body).results;
    const count = films.reduce((acc, film) => {
      if (film.characters.includes(`https://swapi-api.alx-tools.com/api/people/${characterId}/`)) {
        acc++;
      }
      return acc;
    }, 0);
    console.log(count);
  }
});
