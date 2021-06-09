module.exports = {
    description: 'Removes an option from a command',
    prompts: [{
        type: 'input',
        name: 'command',
        message: 'Name of the command'
    }, {
        type: 'input',
        name: 'name',
        message: 'Name of the option to remove'
    }],
    actions: [{
        type: 'delete',
        path: 'commands/dctor-{{command}}.js',
        pattern: /program\.option\('-., --{{name}}', .*\);+\n+/s
    }]
}