# MEGAMI Raffler
This script select raffle winners based on the specified random seed and raffle data

# Prerequisite 
- Node.js

# Setup
```
yarn install
```

# Usage
Specify the random seed and the path to the raffle data file as the command line arguments.
```
node raffler.js <random-seed> <path-to-raffle-data>
```

Raffle data must contain two properties `prizes` and `holders` as follows:
`prizes` holds the name and amount of the prizes.
`holders` holds the wallet address of the holders and number of waffle tickets they have.
```
{
    "prizes": [
        {"item": "Naoki NFT", "amount": 1},
        {"item": "Naoki Stamp", "amount": 2},
        {"item": "Chuck Stamp", "amount": 3}
    ],
    "holders": [
        {"wallet": "0x1", "tickets": 10},
        {"wallet": "0x2", "tickets":  1},
        {"wallet": "0x3", "tickets": 20},
        {"wallet": "0x4", "tickets":  5},
        {"wallet": "0x5", "tickets":  3},
        {"wallet": "0x6", "tickets":  2},
        {"wallet": "0x7", "tickets": 10},
        {"wallet": "0x8", "tickets":  1},
        {"wallet": "0x9", "tickets": 20},
        {"wallet": "0x10", "tickets": 5}
    ]
}
```

Result will be written as a JSON string to the console and the file `raffleResult.json`.
Here is the sample of the output
```
{
  'Naoki NFT': [ '0x3' ],
  'Naoki Stamp': [ '0x1', '0x5' ],
  'Chuck Stamp': [ '0x9', '0x4', '0x7' ]
}
```
