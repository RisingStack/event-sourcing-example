'use strict'

const assert = require('assert')
const Account = require('./account')
const accountEvent = require('./accountEvent')

// eslint-disable-next-line
const log = console.log

// Init
accountEvent.reset()

log('--- Create events ---')

// Open accounts
Account.open('Samantha', 1000)
Account.open('John', 500)
Account.open('Suzzy', 0)

log('Accounts are opened', Account.get())

// Transfer some money
Account.transferMoney('Samantha', 'John', 500)
Account.transferMoney('Samantha', 'Suzzy', 500)

log('Some money are transfered', Account.get())

// Close some accounts
Account.close('Samantha')

log('Samantha closed her account', Account.get())

/* ********** Playing with Event Sourcing events ********** */

log('--- Process events ---')

// Rebuild from event log
log('Rebuild accounts from event log', accountEvent.rebuild())
assert.deepEqual(Account.get(), accountEvent.rebuild())

// Undo last event
log('Undo last event', accountEvent.undo(Account.get(), 1))

// Undo last two event
log('Undo last two event', accountEvent.undo(Account.get(), 2))

// Query first step
log('Query first step', accountEvent.query(1))

// Query second step
log('Query second step', accountEvent.query(2))
