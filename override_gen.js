const fs = require('fs');
const trinkets = require('./relevant_trinkets.json');

const MIN_ILVL = 865;
const MAX_ILVL = 920;
const STEP = 5;

const STAT_STICK_ID = 134203;

const STAT_STICK_BONUS_CRIT = 603;
const STAT_STICK_BONUS_HASTE = 604;
const STAT_STICK_BONUS_MASTERY = 605;
const STAT_STICK_BONUS_VERS = 607;

console.log('generating override...');
let override = `
# Auto-generated trinket override by Faide:
# Copy the contents of this file into the "Overrides" tab of simc.

# Remove character trinkets as a baseline
trinket1=
trinket2=
`;

addStatSticks(trinkets);

each(trinkets, (trinket, trinketID) => {
  for (let ilvl = MIN_ILVL; ilvl <= MAX_ILVL; ilvl += STEP) {
    const id = trinket.trinketIDOverride || trinketID;
    const bonusID = trinket.bonusID || '';
    override += (
`
copy=${slugTrinketName(trinket.name_enus)}_${ilvl}
trinket1=,id=${id},bonus_id=${bonusID},ilevel=${ilvl}
`
    );
  }
});

fs.writeFileSync('715_trinket_override.txt', override);
console.log('done!');

function addStatSticks(src) {
  src[STAT_STICK_ID + '_crit'] = {
    name_enus: 'Stat_Stick_Crit',
    trinketIDOverride: STAT_STICK_ID,
    bonusID: STAT_STICK_BONUS_CRIT
  };
  src[STAT_STICK_ID + '_haste'] = {
    name_enus: 'Stat_Stick_Haste',
    trinketIDOverride: STAT_STICK_ID,
    bonusID: STAT_STICK_BONUS_HASTE
  };
  src[STAT_STICK_ID + '_mastery'] = {
    name_enus: 'Stat_Stick_Mastery',
    trinketIDOverride: STAT_STICK_ID,
    bonusID: STAT_STICK_BONUS_MASTERY
  };
  src[STAT_STICK_ID + '_vers'] = {
    name_enus: 'Stat_Stick_Vers',
    trinketIDOverride: STAT_STICK_ID,
    bonusID: STAT_STICK_BONUS_VERS
  };
}

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
