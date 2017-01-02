'use strict'

const fs = require('fs')
const path = require('path')
const os = require('os')
const _ = require('lodash')

const EVENT_LOG_PATH = path.join(__dirname, 'event_log.txt')

const EVENT = {
  open: 'open',
  close: 'close',
  transfer: 'transfer'
}

function reset () {
  fs.writeFileSync(EVENT_LOG_PATH, '')
}

function append (event) {
  fs.appendFileSync(EVENT_LOG_PATH, JSON.stringify(event) + os.EOL)
}

function getEvents () {
  const eventLines = fs.readFileSync(EVENT_LOG_PATH, 'utf-8')

  return eventLines
    .split(os.EOL)
    .filter((eventLineStr) => eventLineStr.length)
    .map((eventLineStr) => {
      let eventLine = {}
      try {
        eventLine = JSON.parse(eventLineStr)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }
      return eventLine
    })
}

function rebuild (number) {
  let events = getEvents()

  if (!isNaN(number)) {
    events = events.splice(0, number)
  }

  return events
    .reduce((accounts, event) => {
      if (event.type === EVENT.open) {
        accounts[event.id] = event.balance
      } else if (event.type === EVENT.close) {
        delete accounts[event.id]
      } else if (event.type === EVENT.transfer) {
        accounts[event.fromId] -= event.amount
        accounts[event.toId] += event.amount
      }
      return accounts
    }, {})
}

function undo (accounts, lastX) {
  return getEvents().splice(-lastX)
    .reduceRight((accounts, event) => {
      if (event.type === EVENT.open) {
        delete accounts[event.id]
      } else if (event.type === EVENT.close) {
        accounts[event.id] = event.balance
      } else if (event.type === EVENT.transfer) {
        accounts[event.fromId] += event.amount
        accounts[event.toId] -= event.amount
      }
      return accounts
    }, _.clone(accounts))
}

function query (number) {
  return rebuild(number)
}

module.exports = {
  reset,
  append,
  rebuild,
  undo,
  query,

  EVENT
}
