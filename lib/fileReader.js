'use strict'

const fs = require('fs')

function readFileAsArrayOfStrings(filename) {
    const fileAsString = fs.readFileSync(filename, 'utf-8')
    return fileAsString.split('\n')
}

module.exports = readFileAsArrayOfStrings
