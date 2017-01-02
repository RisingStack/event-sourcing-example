'use strict'

const AccountEvent = require('./accountEvent')

// Current state (starts with empty, it's usually stored in a DB)
const accounts = {}

function getAll () {
  return accounts
}

function open (accountId, openingBalance) {
  AccountEvent.append({
    type: AccountEvent.EVENT.open,
    id: accountId,
    balance: openingBalance,
    timestamp: Date.now()
  })

  accounts[accountId] = openingBalance
}

function close (accountId) {
  AccountEvent.append({
    type: AccountEvent.EVENT.close,
    id: accountId,
    balance: accounts[accountId],
    timestamp: Date.now()
  })

  delete accounts[accountId]
}

function transferMoney (accountIdFrom, accountIdTo, amount) {
  AccountEvent.append({
    type: AccountEvent.EVENT.transfer,
    fromId: accountIdFrom,
    toId: accountIdTo,
    amount,
    timestamp: Date.now()
  })

  accounts[accountIdFrom] -= amount
  accounts[accountIdTo] += amount
}

module.exports = {
  get: getAll,
  open,
  close,
  transferMoney
}
