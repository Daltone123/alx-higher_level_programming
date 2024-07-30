#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./101-starwars_characters.js <Movie_ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(movieUrl, (error, response, body) => {
  if (error) {
    console.error('Error making the request:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Error: Received status code ${response.statusCode}`);
    return;
  }

  try {
    const movie = JSON.parse(body);
    const characterUrls = movie.characters;

    characterUrls.forEach((characterUrl, index) => {
      request(characterUrl, (error, response, body) => {
        if (error) {
          console.error('Error fetching character:', error);
          return;
        }

        if (response.statusCode !== 200) {
          console.error(`Error: Received status code ${response.statusCode}`);
          return;
        }

        try {
          const character = JSON.parse(body);
          console.log(character.name);
        } catch (parseError) {
          console.error('Error parsing character response:', parseError);
        }
      });
    });
  } catch (parseError) {
    console.error('Error parsing movie response:', parseError);
  }
});
