#!/usr/bin/env node
const { program } = require('commander')

// >commands
program.command('init', 'Wire up to a project')
// <commands

program.action(() => {
    program.help()
})
program.parse(process.argv)