'use strict'

const glob = require('glob')
const tap = require('tap')
const ocr = require('../index')
const fs = require('fs')

const useCases = glob.sync('data/use-case-4/input*.txt', { cwd: 'tests/' })
const solutions = glob.sync('data/use-case-4/output*.txt', { cwd: 'tests/' })
    .map(filepath => fs.readFileSync(`tests/${filepath}`, { encoding: 'utf-8' }))

useCases.forEach((useCase, index) => {
    const actualResponse = ocr(`./tests/${useCase}`)
    const expectedResponse = solutions[index]
    tap.strictSame(actualResponse, expectedResponse)
})
