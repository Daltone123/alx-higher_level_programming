#!/usr/bin/node

const fs = require('fs');

// Check if the correct number of arguments are provided
if (process.argv.length !== 4) {
  console.error('Usage: ./1-writeme.js <file_path> <string_to_write>');
  process.exit(1);
}

const filePath = process.argv[2]; // The file path
const content = process.argv[3];  // The string to write

// Write the content to the file with UTF-8 encoding
fs.writeFile(filePath, content, 'utf-8', (err) => {
  if (err) {
    console.error(err); // Print the error object if an error occurred
  } else {
    console.log('File written successfully'); // Success message
  }
});
