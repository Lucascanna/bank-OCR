'use strict'

const fs = require('fs')
const zip = require('lodash.zip')

function readFileAsArrayOfStrings(filename) {
    const fileAsString = fs.readFileSync(filename, 'utf-8')
    return fileAsString.split('\n')
}

function readDigits(filename) {
    const fileLines = readFileAsArrayOfStrings(filename)
    const digitRows = fileLines.map(line => line.match(/.{3}/g))
    const digits = zip(...digitRows)
    return digits
}

module.exports = readDigits
