module.exports = {
    description: 'Adds a command option',
    prompts: [{
        type: 'input',
        name: 'command',
        message: 'Choose the command'
    }, {
        type: 'input',
        name: 'name',
        message: 'Name the option'
    }, {
        type: 'input',
        name: 'abbr',
        message: 'Provide an abbreviation'
    }, {
        type: 'input',
        name: 'description',
        message: 'Describe the option'
    }],
    actions: [{
        type: 'append',
        path: 'commands/dctor-{{command}}.js',
        pattern: '>options',
        template: 'program.option(\'-{{abbr}}, --{{name}}\', \'{{description}}\');'
    }]
}