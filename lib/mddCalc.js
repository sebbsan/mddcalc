/**
 * calculates the maximum draw down from the given tuple of prices
 *
 * @param {*} troughValue
 * @param {*} peakValue
 * @returns
 */
const calculateDrawDown = function (troughValue, peakValue) {
  return (troughValue - peakValue) / peakValue;
};

/**
 *
 * gets the trough value from given array of prices
 * @param Array priceList
 * @returns
 */
const getTroughValue = function (priceList) {
  return priceList.reduce((a, b) => {
    return Math.min(a, b);
  });
};
/**
 *
 * gets the peak value from given array of prices
 * @param Array priceList
 * @returns
 */
const getPeakValue = function (priceList) {
  return priceList.reduce((a, b) => {
    return Math.max(a, b);
  });
};
/**
 *
 * Calculates the maximum draw down from a given array of prices
 * @param Array priceList
 * @returns
 */
const calculateMaximumDrawdownFromPriceList = function (priceList) {
  let highWatermark = 0;
  const maximumDrawDown = priceList.reduce((maxDD, securityPrice) => {
    if (securityPrice > highWatermark) {
      highWatermark = securityPrice;
    }
    const drawDown = calculateDrawDown(securityPrice, highWatermark);
    if (drawDown < maxDD) {
      return drawDown;
    }
    return maxDD;
  }, 0);

  return maximumDrawDown;
};

/**
 * filters a given array of date / price tuples by dates given in buyDate / sellDate inclusive interval
 *
 * @param Date buyDate
 * @param Date sellDate
 * @param Array datePriceList
 * @returns
 */
const filterPricesByDates = function (buyDate, sellDate, datePriceList) {
  if (buyDate >= sellDate) {
    throw new Error('buyDate must be before sellDate');
  }
  const relevantDatePriceList = datePriceList.filter((datePriceTuple) => {
    const priceDate = new Date(datePriceTuple.date);
    return priceDate >= buyDate && priceDate <= sellDate;
  });

  const relevantPrices = relevantDatePriceList.map((datePriceTuple) => {
    return datePriceTuple.price;
  });
  return relevantPrices;
};

/**
 * calculates the MDD from a given set of data within given date interval
 *
 * @param Date buyDate
 * @param Date sellDate
 * @param Array priceData
 * @returns
 */
const calculateMddFromPriceData = function (buyDate, sellDate, priceData) {
  const relevantPrices = filterPricesByDates(new Date(buyDate), new Date(sellDate), priceData);
  return calculateMaximumDrawdownFromPriceList(relevantPrices);
};

module.exports = {
  calculateMaximumDrawdownFromPriceList,
  calculateDrawDown,
  getTroughValue,
  getPeakValue,
  filterPricesByDates,
  calculateMddFromPriceData,
};
