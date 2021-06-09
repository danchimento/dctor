#!/usr/bin/env node
const { program } = require('commander')

// #region commands
// #endregion commands

program.action(() => {
    program.help()
})
program.parse(process.argv)