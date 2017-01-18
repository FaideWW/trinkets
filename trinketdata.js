const fs = require('fs');

const trinketData = require('./trinkets.json');

console.log(`Scraped ${count(trinketData)} trinkets from wowhead.`);


const filterByReqLevel = (item => (
  item.jsonequip.reqlevel === 110 || (item.jsonequip.reqlevel === 101 && item.quality === 3)
));

const maxLevelTrinkets = filter(trinketData, filterByReqLevel);

const uniqueMaxLevelTrinkets = uniq(maxLevelTrinkets);

each(uniqueMaxLevelTrinkets, (trinket, id) => {
  console.log(trinket.name_enus);
});

console.log(`Unique items with reqlevel=110: ${count(uniqueMaxLevelTrinkets)}`);

fs.writeFileSync('relevant_trinkets.json', JSON.stringify(uniqueMaxLevelTrinkets));

console.log('File \'relevant_trinkets.json\' written');

function count(src) {
  let count = 0;
  for (const trinketID in src) {
    if (src.hasOwnProperty(trinketID)) {
      count += 1;
    }
  }

  return count;
}

function filter(src, iterator) {
  const dest = {};

  for (const trinketID in src) {
    if (src.hasOwnProperty(trinketID) && iterator(src[trinketID], trinketID, src)) {
      dest[trinketID] = src[trinketID];
    }
  }

  return dest;

}

function uniq(src) {
  const cache = {};
  return filter(src, (trinket) => {
    const name = trinket.name_enus;
    if (cache[name]) {
      return false;
    }

    cache[name] = 1;
    return true;
  });
}

function each(src, exec) {

  for (const trinketID in src) {
    if (src.hasOwnProperty(trinketID)) {
      exec(src[trinketID], trinketID, src);
    }
  }

}
