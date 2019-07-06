'use strict'

const tap = require('tap')
const readDigits = require('../lib/fileReader')

const expectedResult = [
    [
        ' _ ',
        '|_ ',
        '|_|'
    ],
    [
        ' _ ',
        ' _|',
        ' _|'
    ],
    [
        ' _ ',
        ' _|',
        ' _|'
    ],
    [
        ' _ ',
        ' _|',
        ' _|'
    ],
    [
        ' _ ',
        '|_|',
        ' _|'
    ],
    [
        ' _ ',
        '|_|',
        '|_|'
    ],
    [
        ' _ ',
        '|_|',
        '|_|'
    ],
    [
        ' _ ',
        '|_ ',
        ' _|'
    ],
    [
        ' _ ',
        ' _|',
        ' _|'
    ],
]

const actualResult = readDigits('tests/data/use-case-1/input1.txt')
tap.strictSame(actualResult, expectedResult)