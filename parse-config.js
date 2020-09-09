const fs = require('fs');

function getConfigParam(configFilePath, param) {
  if(!configFilePath || !param) throw 'Missing argument: configFilePath and param are required arguments.'
  if(typeof configFilePath !== 'string' || typeof param !== 'string') throw 'Invalid argument type: expected string.'

  const configLines = fs.readFileSync(configFilePath, 'utf-8').split('\n');
  for(let i = 0; i < configLines.length; ++i) {
    const line = configLines[i];
    const validLineRegex = /[a-zA-Z]\w* *= *\S+/; // not entirely clear what a valid line would be, but this might describe it
    if(line.startsWith('#') || !(validLineRegex).test(line)) continue;

    const splitLine = line.split(/=(.+)/, 2).map(string => string.trim());

    const [lineParam, lineValueString] = splitLine;
    if(lineParam === param) {
        if(Number(lineValueString)) return Number(lineValueString)
        if(['on', 'yes', 'true'].includes(lineValueString)) return true;
        if (['off', 'no', 'false'].includes(lineValueString)) return false;
        return lineValueString;
    }
  }
  return 'Parameter not found in config file provided.'
}

// call function as below:
console.log(getConfigParam('./config.txt', 'server_id'));
console.log(getConfigParam('./config.txt', 'debug_mode'));
console.log(getConfigParam('./config.txt', 'log_file_path'));
