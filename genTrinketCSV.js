const argv = require('yargs');
const fs = require('fs');
const readline = require('readline');
const [filename] = argv.argv._; 
console.log(filename);

let csvOutput = 'dps,trinketname,ilevel,chestbonus\n';

const lineReact = readline.createInterface({ input: fs.createReadStream(filename) });

// const regex = / ([0-9]+)   ([0-9.%]+)  ([A-Za-z_]+)(?:_([0-9]+)(_Chest)?)?/g;
const regex = / ([0-9]+)   [0-9.%]+  ([A-Za-z_]+)_?([0-9]+)?(_Chest)?/g;

lineReact.on('line', (line) => {
  const result = regex.exec(line);
  if (result) {
    console.log(result);
    const [fullStr, dps, name, ilvl, hasChest] = result;
    const line = `${dps},${name},${ilvl},${!!hasChest}`;
    console.log(line);
    csvOutput += line + '\n';
  } else {
    fs.writeFileSync(`${filename}.csv`, csvOutput);
    console.log('done!');
    process.exit(0);
  }


});

lineReact.on('close', () => {
  fs.writeFileSync(`${filename}.csv`, csvOutput);
  console.log('interrupted - end of file');
  process.exit(0);
});
