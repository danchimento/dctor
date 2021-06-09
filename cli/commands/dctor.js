#!/usr/bin/env node
const { program } = require('commander')

// #region commands
program.command2('cmd1', 'does a thing');
program.command2('cmd2', 'does another thing');
// #endregion commands

program.action(() => {
    program.help()
})

program.parse(process.argv)