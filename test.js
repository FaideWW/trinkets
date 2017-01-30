const regex = / ([0-9]+)   [0-9.%]+  ([A-Za-z_]+)_?([0-9]+)?(_Chest)?/g;

const test1 = ' 277785   0.3%  Baseline';
const test2 = ' 277804   0.1%  Baseline';

console.log(regex.exec(test1));
console.log(regex.exec(test2));


