const fs = require('fs');
const trinkets = require('./relevant_trinkets.json');

const MIN_ILVL = 865;
const MAX_ILVL = 920;
const STEP = 5;

console.log('generating override...');
let override = `
# Auto-generated trinket override by Faide:
# Copy the contents of this file into the "Overrides" tab of simc.

# Remove character trinkets as a baseline
trinket1=
trinket2=
`;

each(trinkets, (trinket, trinketID) => {
  for (let ilvl = MIN_ILVL; ilvl <= MAX_ILVL; ilvl += STEP) {
    override += (
`
copy=${slugTrinketName(trinket.name_enus)}_${ilvl}
trinket1=,id=${trinketID},ilevel=${ilvl}
`
    );
  }
});

fs.writeFileSync('715_trinket_override.txt', override);
console.log('done!');



function each(src, exec) {

  for (const trinketID in src) {
    if (src.hasOwnProperty(trinketID)) {
      exec(src[trinketID], trinketID, src);
    }
  }

}

function slugTrinketName(name) {
  return name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]+/g, "");
}
