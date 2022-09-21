/**
 * MEGAMI Holder Raffle Script Version 1.0.0
 */
const fs = require('fs');
const Web3 = require('web3');
const BN = Web3.utils.BN;

const raffleRandomSeed = process.argv[2];
if (!raffleRandomSeed) {
  console.log("Please specify random seed");
  process.exit(1);
}

const raffleDataFile = process.argv[3];
if (!raffleDataFile) {
  console.log("Please specify raffle data file");
  process.exit(1);
}

// load the raffle data
const raffleData = require(raffleDataFile);

// build ticketBox
const ticketBox = raffleData.holders.reduce((box, holder) => {
  return box.concat(Array(holder.tickets).fill(holder.wallet));
}, []);

// Check if total number of prizes is fewer than holders
const totalPrizes = raffleData.prizes.reduce((total, prize) => total + prize.amount, 0);
if( totalPrizes > raffleData.holders.length ) {
  console.log("the number of holders is too few");
  process.exit(1);
}

// draw tickets
const result = {};
const winners = [];
let randomSource = raffleRandomSeed;
const totalTickets = new BN(ticketBox.length);
raffleData.prizes.map((prize) => {
  result[prize.item] = [];
  let selected = 0;
  while(selected !== prize.amount) {
    // Pick a winner
    randomSource = new BN(Web3.utils.keccak256(randomSource.toString()));
    winner = ticketBox[randomSource.umod(totalTickets)];
    if (winners.includes(winner)) {
      // The holder already won. Pick next winner.
      continue;
    }
    // push winner to the result
    result[prize.item].push(winner);
    winners.push(winner);
    selected++;
  }
})

fs.writeFileSync('./raffleResult.json', JSON.stringify(result, null, 2), 'utf8');
console.log(result);