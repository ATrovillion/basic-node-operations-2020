const commands = require('./commands.js');

process.stdout.write('prompt > ');

process.stdin.on('data', userInput => {
  const trimmedUserInput = userInput.toString().trim();

  commands.evaluateCmd(trimmedUserInput);
});
