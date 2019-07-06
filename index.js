'use strict'

const zip = require('lodash.zip')

const digitsMap = require('./lib/digits')
const readFileAsArrayOfStrings = require('./lib/fileReader')

module.exports = ocrParser

function ocrParser(filename) {
    const fileLines = readFileAsArrayOfStrings(filename)
    const accountNumbersRepresentations = groupLinesBelongingToOneAccountNumber(fileLines)
    return accountNumbersRepresentations
        .map(accounteNumberRepresentation => parseAccountNumber(accounteNumberRepresentation))
        .join('\n')
}

function groupLinesBelongingToOneAccountNumber(fileLines) {
    return fileLines.reduce((accumulator, currentLine, currentIndex, initialArray) => {
        if (currentIndex % 4 == 0) {
            accumulator.push(initialArray.slice(currentIndex,currentIndex+4))
        }
        return accumulator
    }, [])
}

function parseAccountNumber(accountNumberRepresentation) {
    const digitsRepresentations = separateDigits(accountNumberRepresentation)
    const parsedAccountNumber = digitsRepresentations
        .map(digitRepresentation => parseDigit(digitRepresentation))
        .join('')
    const validatedAccountNumber = validateAccountNumber(parsedAccountNumber)
    return validatedAccountNumber
}

function separateDigits(ocrLines) {
    const digitRows = ocrLines.map(line => line.match(/.{3}/g))
    const digits = zip(...digitRows)
    return digits
}

function parseDigit(digit) {
    const flatDigit = digit.join()
    const number = digitsMap[flatDigit]
    if (!number) {
        return '?'
    }
    return number
}

function validateAccountNumber(accountNumberAsString) {
    if (isIll(accountNumberAsString)) {
        return `${accountNumberAsString} ILL`
    }
    if (isErroneous(accountNumberAsString)) {
        return `${accountNumberAsString} ERR`
    }
    return accountNumberAsString
}

function isIll(accountNumberAsString) {
    return accountNumberAsString.includes('?')
}

function isErroneous(accountNumberAsString) {
    const checksum = computeChecksum(accountNumberAsString)
    return checksum % 11 !== 0
}

function computeChecksum(accountNumberAsString) {
    return accountNumberAsString
        .split('')
        .reverse()
        .map((currentNumber, currentIndex) => parseInt(currentNumber)*(currentIndex+1))
        .reduce((total, current) => total += current, 0)
}