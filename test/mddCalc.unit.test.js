const test = require('ava');
const {
  calculateMaximumDrawdown,
  getTroughValue,
  getPeakValue,
  calculateMaximumDrawdownFromPriceList,
  filterPricesByDates,
  calculateMddFromPriceData,
} = require('../lib/mddCalc');

const TEST_DATE_PRICE_LIST = [
  { date: '2017-12-28', price: 61.14360711840625 },
  { date: '2017-12-29', price: 50.23423423434343 },
  { date: '2017-12-30', price: 55.13243434123122 },
  { date: '2017-12-31', price: 69.14360711840625 },
  { date: '2018-01-01', price: 60.12312312312312 },
  { date: '2018-01-02', price: 51.65626604431816 },
  { date: '2018-01-03', price: 55.65626604431816 },
];

test('calculates mdd', (t) => {
  const mddValue = calculateMaximumDrawdown(500, 1000);
  t.is(mddValue, -0.5);
});

test('get trough value', (t) => {
  const troughValue = getTroughValue([500, 1000, 534.21, 343.23, 100]);
  t.is(troughValue, 100);
});

test('get peak value', (t) => {
  const peakValue = getPeakValue([500, 1000, 534.21, 343.23, 100]);
  t.is(peakValue, 1000);
});

test('calculates mdd from Price List', (t) => {
  const mddValue = calculateMaximumDrawdownFromPriceList([500, 1000, 534.21, 343.23, 100]);
  t.is(mddValue, -0.9);
});

test('filter prices by date', (t) => {
  const filteredPrices = filterPricesByDates(new Date('2017-12-30'), new Date('2018-01-02'), TEST_DATE_PRICE_LIST);

  t.deepEqual(filteredPrices, [55.13243434123122, 69.14360711840625, 60.12312312312312, 51.65626604431816]);
});
test('calculate MDD from price data set', (t) => {
  const mdd = calculateMddFromPriceData(new Date('2017-12-30'), new Date('2018-01-02'), TEST_DATE_PRICE_LIST);

  t.is(mdd, -0.25291334662569126);
});

test('filter prices by date must throw error on irregular parameters', (t) => {
  const error = t.throws(
    () => {
      filterPricesByDates(new Date('2018-12-30'), new Date('2018-01-02'), TEST_DATE_PRICE_LIST);
    },
    { instanceOf: Error },
  );
  t.is(error.message, 'buyDate must be before sellDate');
});
