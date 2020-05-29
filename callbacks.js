const fs = require('fs');

function hello() {
  console.log('Hello, my friend, hello.');
}

fs.readFile('bash.js', (err, file) => {
  if (err) throw err;
  console.log(file.toString());
});

hello();
