# mddcalc

Calculates the maximum draw down of a given asset.

## Pre-Requisites

- Install node.js latest version (this was tested with node 14)
- Clone the repository using `git clone git@github.com:sebbsan/mddcalc.git`
- go into the root directory with `cd mddcalc`

## How to use

This is a simple command line utility that accepts 3 parameters:

1. `-f` path to a CSV file - required
1. `-b` buyDate - date the asset was bought. If not given, it will default to the earliest date in the given file. buyDate must be a valid date with the format `YYYY-MM-DD` and must be earlier than sellDate.
1. `-s` sellDate - date the asset was sold. If not given, it will default to the latest date in the given file. sellDate must be a valid date with the format `YYYY-MM-DD` and must be later than sellDate.

It can be executed by either executing `./index.js [my parameters]` or entering `node index.js -- [my parameters]`

## Examples

`./index.js -f prices.csv`
`/index.js -f prices.csv -b 2014-06-02 -s 2017-12-20`
