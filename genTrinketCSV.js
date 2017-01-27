const argv = require('yargs');
const fs = require('fs');
const readline = require('readline');
const { _: newFiles, i: initialDataFile, o: outputFile = 'output.csv' } = argv.argv; 

console.log('Producing CSV');
console.log('Initial file: ', initialDataFile);
console.log('Input files: ', newFiles.join(','));
console.log('Output file: ', outputFile);

Promise.resolve(new Promise((resolve, reject) => readInitialData(resolve, reject))
  .then(data => {
    const result = newFiles.reduce((promise, filename) => {
      console.log('new file: ', filename);
      return promise.then(prevData => {
        return fillInNewData(data, filename);
      });
    }, Promise.resolve(data));
    return result;
  })
.then(output => {
  console.log('outputting to', outputFile);
  return writeCSVToFile(output);
}))
.catch(e => {
  console.log('An error occurred:');
  console.log(e);
  process.exit(1);
});

// new Promise((resolve, reject) => {
//   return writeCSVToFile(resolve, reject);
// }).then((output) => {
//   console.log('done!');
// }).catch(e => {
//   console.log('broke', e);
// }).then(() => process.exit(0));

function fillInNewData(data, filename) {
  console.log('Reading in new file, ', filename);
  const lineReact = readline.createInterface({ input: fs.createReadStream(filename) });

  // const regex = / ([0-9]+)   ([0-9.%]+)  ([A-Za-z_]+)(?:_([0-9]+)(_Chest)?)?/g;
  const regex = / ([0-9]+)   [0-9.%]+  ([A-Za-z_]+)_?([0-9]+)?(_Chest)?/g;

  return new Promise((resolve, reject) => {
    lineReact.on('line', (line) => {
      const result = regex.exec(line);
      if (result) {
        let [fullStr, dps, name, ilvl, hasChest] = result;
        if (name[name.length - 1] === '_') { name = name.slice(0, -1); }

        const uniqueID = getUniqueID(name, ilvl, hasChest);
        console.log(fullStr);

        if (data[uniqueID]) {
          console.log(`replacing ${uniqueID} - old value: ${data[uniqueID].dps} - new value: ${dps}`);
        }

        data[uniqueID] = {
          fullStr,
          dps,
          name,
          ilvl,
          hasChest,
        };
      }
    });

    lineReact.on('close', () => {
      resolve(data);
    });
  });
}

function writeCSVToFile(data) {


  let csvOutput = 'dps,trinketname,ilevel,chestbonus\n';

  for (let uniqueID in data) {
    if (!data.hasOwnProperty(uniqueID)) continue;

    const { dps, name, ilvl, hasChest } = data[uniqueID];
    
    const line = `${dps},${name},${ilvl},${!!hasChest}`;
    csvOutput += line + '\n';
  }

  fs.writeFileSync(outputFile, csvOutput);
  return true;
}


function readInitialData(resolve, reject) {
  console.log('Reading initial file...');
  let count = 0;

  const initialData = {};

  if (!initialDataFile) {
    console.log('No initial file supplied; starting with empty dataset');
    return resolve(initialData);
  }
  
  const lineReact = readline.createInterface({ input: fs.createReadStream(initialDataFile) });

  lineReact.on('line', (line) => {
    const [dps, name, ilvl, hasChest] = line.split(',');
    if (Number.isNaN(Number(dps))) return;
    count++;
    const uniqueID = getUniqueID(name, ilvl, hasChest)
    initialData[uniqueID] = {
      dps: Number(dps), 
      name, 
      ilvl, 
      hasChest: hasChest == 'true',
    };
  });

  lineReact.on('close', () => {
    console.log('Done.  Found', count, 'initial results.');
    resolve(initialData);
  })
}

function getUniqueID(name, ilvl, hasChest) {
  return `${name}_${ilvl}_${hasChest}`;
}
