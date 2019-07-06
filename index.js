'use strict'

const digitsMap = require('./lib/digits')
const readDigits = require('./lib/fileReader')

function fromOcrToNumber(digit) {
    const flatDigit = digit.join()
    return digitsMap[flatDigit]
}

function ocr(filename) {
    const ocrDigits = readDigits(filename)
    return ocrDigits
        .map(digit => fromOcrToNumber(digit))
        .join('')
}

module.exports = ocr