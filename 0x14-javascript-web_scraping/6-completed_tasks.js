#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./6-completed_tasks.js <API_URL>');
  process.exit(1);
}

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error making the request:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Error: Received status code ${response.statusCode}`);
    return;
  }

  try {
    const todos = JSON.parse(body);
    const userTasks = {};

    todos.forEach(todo => {
      if (todo.completed) {
        if (userTasks[todo.userId]) {
          userTasks[todo.userId]++;
        } else {
          userTasks[todo.userId] = 1;
        }
      }
    });

    for (const userId in userTasks) {
      if (Object.prototype.hasOwnProperty.call(userTasks, userId)) {
        console.log(`User ${userId} has completed ${userTasks[userId]} tasks`);
      }
    }
  } catch (parseError) {
    console.error('Error parsing the response body:', parseError);
  }
});
