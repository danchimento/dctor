module.exports = {
    description: 'Creates a command',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name the command'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe the command'
    }],
    actions: [
        // {
        //     type: 'add',
        //     path: 'commands/dctor-{{name}}.js',
        //     templateFile: '_templates/cli/command/command.hbs',
        // },
        {
            type: 'add-line',
            path: 'commands/dctor.js',
            templateFile: '_templates/cli/command/program_command.hbs',
            section: 'commands'
        }]
}