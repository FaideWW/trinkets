const fs = require('fs');
const trinkets = require('./relevant_trinkets.json');

const MIN_ILVL = 865;
const MAX_ILVL = 925;
const STEP = 5;

const STAT_STICK_ID = 134203;

const STAT_STICK_BONUS_CRIT = 603;
const STAT_STICK_BONUS_HASTE = 604;
const STAT_STICK_BONUS_MASTERY = 605;
const STAT_STICK_BONUS_VERS = 607;

const USABLES = [
  140808,
  143112,
  143225,
  136143,
  136256,
  142160,
  142164,
  142159,
  139320,
  135691,
  142773,
  135804,
  142660,
  137329,
  137369,
  137433,
  137439,
  137486,
  137537,
  137539,
  137541,
];

const CHEST_EMPOWERED = [
  142157,
  142159,
  142160,
  142164,
  142165,
  142167,
];

const SKIP = [
  142506,
  144259,
];

const ONLY_865 = [
  128705,
  128711,
];

const CHEST_STRING = `harness_of_smoldering_betrayal,id=142203,bonus_id=0,stats=0agi_0crit_0mastery_0haste_0versatility`;

console.log('generating override...');
let override = `
# Auto-generated trinket override by Faide:
# Copy the contents of this file into the "Overrides" tab of simc.

# Remove character trinkets as a baseline
trinket1=
trinket2=
`;

addStatSticks(trinkets);

let lastWasChestEmpowered = false;

each(trinkets, (trinket, trinketID) => {
  for (let ilvl = MIN_ILVL; ilvl <= MAX_ILVL; ilvl += STEP) {
    const id = trinket.trinketIDOverride || trinketID;
    const shouldSkip = SKIP.includes(Number(id)) || (ilvl !== 865 && ONLY_865.includes(Number(id)));
    // const shouldSkip = !USABLES.includes(Number(id));
    const isUsable = true;
    const isChestEmpowered = CHEST_EMPOWERED.includes(Number(id));
    if (!shouldSkip) {
      console.log(`${id} is useable`);
      const bonusID = trinket.bonusID || '';
      override += (
`
copy=${slugTrinketName(trinket.name_enus)}_${ilvl}
trinket1=,id=${id},bonus_id=${bonusID},ilevel=${ilvl}
`
      );
      
      if (lastWasChestEmpowered) {
        lastWasChestEmpowered = false;
        override += `chest=
`;
      }

      if (isChestEmpowered) {
        lastWasChestEmpowered = true;
        override += (
`
copy=${slugTrinketName(trinket.name_enus)}_${ilvl}_Chest
trinket1=,id=${id},bonus_id=${bonusID},ilevel=${ilvl}
chest=${CHEST_STRING}
`
        );
        
      }
    }
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
