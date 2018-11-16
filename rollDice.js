// WEIGH

function weigh(tally) {
  let total = 0;
  let weighedResult = {};
  for (let i = 1; typeof tally[i] === 'number'; i++) { total += tally[i]; }
  for (let i = 1; typeof tally[i] === 'number'; i++) { weighedResult[i] = (1.0 * tally[i])/total; }
  return weighedResult;
}


// TALLY

function tally(rollResults) {
  let tally = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  rollResults.forEach(result => { ++tally[result]; });
  return tally;
}

function getLowest(roll) {
  for (let i = 1; typeof roll[i] === 'number'; i++) if (roll[i] !== 0) return i;
}

// DICE

function getRoll(numberOfSides = 6) {
  return Math.floor(Math.random()*numberOfSides)+1;
}

function doRoll(numberOfDice = 1) {
  let rollResults = [];
  for (let i = 0; i < numberOfDice; i++) {
    rollResults.push(getRoll(6));
  }
  return rollResults;
}

function rollDice(numberOfDice = 1, numberOfRolls = 1) {
  
  pool = [];

  while (numberOfRolls-- > 0) {
    pool.push(doRoll(numberOfDice));
  }

  return pool;
}

// ==========

let result = rollDice(6,100000);
let tallied = [];
let lowest = [];

result.forEach(item => {
  tallied.push(tally(item));
});

tallied.forEach(item => {
  lowest.push(getLowest(item));
});

let talliedLowest = tally(lowest);
let weighedResult = weigh(talliedLowest);

// console.log(result);
// console.log(tallied);
// console.log(lowest);

console.log(talliedLowest);
console.log(weighedResult);