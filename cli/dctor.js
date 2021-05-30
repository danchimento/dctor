#!/usr/bin/env node
const { program } = require('commander')
program
    // mcd-order-burger
    .command('init', 'Order a burger menu')
    // mcd-order-dessert
    .command('dessert', 'Order some dessert')
program.action(() => {
    program.help()
})
program.parse(process.argv)