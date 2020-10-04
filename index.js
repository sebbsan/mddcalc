#!/usr/bin/env node
/* eslint-disable global-require */
const csv = require('csvtojson');
const yargs = require('yargs');

const { calculateMddFromPriceData } = require('./lib/mddCalc');

const { argv } = yargs
  .usage('Calculates Maximum Draw Down of an Asset. Usage: $0 -f [file path] -b [buy date] -s [sell date]')
  .demandOption(['f'])
  .coerce('b', (arg) => {
    return Date.parse(arg);
  })
  .coerce('s', (arg) => {
    return Date.parse(arg);
  });

csv()
  .fromFile(argv.f)
  .then((priceData) => {
    const convertedDataArray = priceData.map((priceDataSet) => {
      return { date: new Date(priceDataSet.Date), price: priceDataSet.Adj_Close };
    });
    const earliestTuple = convertedDataArray.reduce((accumulator, currentValue) => {
      if (accumulator.date >= currentValue.date) {
        return currentValue;
      }
      return accumulator;
    });

    const latestTuple = convertedDataArray.reduce((accumulator, currentValue) => {
      if (accumulator.date <= currentValue.date) {
        return currentValue;
      }
      return accumulator;
    });

    let buyDate = earliestTuple.date;
    if (argv.b && argv.b > buyDate) {
      buyDate = argv.b;
    }

    let sellDate = latestTuple.date;
    if (argv.s && argv.s < sellDate) {
      sellDate = argv.s;
    }

    console.log('calculating minimum draw down for buy date ', buyDate);
    console.log('... and sell date ', sellDate);
    console.log(calculateMddFromPriceData(buyDate, sellDate, convertedDataArray));
  });
