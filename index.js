'use strict'

const zip = require('lodash.zip')

const digitsMap = require('./lib/digits')
const readFileAsArrayOfStrings = require('./lib/fileReader')

function separateOcrDigits(ocrLines) {
    const digitRows = ocrLines.map(line => line.match(/.{3}/g))
    const digits = zip(...digitRows)
    return digits
}

function fromOcrToNumber(digit) {
    const flatDigit = digit.join()
    return digitsMap[flatDigit]
}

function parseOCR(ocrLines) {
    const ocrDigits = separateOcrDigits(ocrLines)
    return ocrDigits
        .map(digit => fromOcrToNumber(digit))
        .join('')
}

function validateOCR(accountNumberAsString) {
    const checksum = accountNumberAsString
        .split('')
        .reverse()
        .map((currentNumber, currentIndex) => parseInt(currentNumber)*(currentIndex+1))
        .reduce((total, current) => total += current, 0)
    if (checksum % 11 !== 0) {
        return `${accountNumberAsString} ERR`
    }
    return accountNumberAsString
}

function main(filename) {
    const fileLines = readFileAsArrayOfStrings(filename)
    const groupedOcrLines = fileLines.reduce((accumulator, currentLine, currentIndex, initialArray) => {
        if (currentIndex % 4 == 0) {
            accumulator.push(initialArray.slice(currentIndex,currentIndex+4))
        }
        return accumulator
    }, [])
    return groupedOcrLines
        .map(parseOCR)
        .map(validateOCR)
        .join('\n')
}

module.exports = main