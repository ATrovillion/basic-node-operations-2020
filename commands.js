const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

const commandLibrary = {
  echo(userInput) {
    done(userInput);
  },
  cat(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  head(fullPath) {
    // Outputs the first five lines of a file
    const fileName = fullPath[0];
    const fileData = fs
      .readFileSync(fileName)
      .toString()
      .split('\n');
    fileData.length = 5;
    const outputData = fileData.join('\n');
    done(outputData);
  },
  tail(fullPath) {
    // Outputs the last five lines of a file
    const fileName = fullPath[0];
    const fileData = fs
      .readFileSync(fileName)
      .toString()
      .split('\n');
    const snippet = fileData.slice(fileData.length - 6);
    const outputData = snippet.join('\n');
    done(outputData);
  },
  reverseString(userInput) {
    // Reverse the order of characters in each word while maintaining original word order
    const reversedWords = userInput.map(word => {
      const reversedWord = word
        .split('')
        .reverse()
        .join('');
      return reversedWord;
    });
    done(reversedWords.join(' '));
  },
  errorHandler() {
    done('That is not a valid command');
  },
};

function evaluateCmd(trimmedUserInput) {
  const userInputArray = trimmedUserInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    case 'reverse':
      commandLibrary.reverseString(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler();
  }
}

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
