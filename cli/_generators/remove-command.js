module.exports = {
    description: 'Removes a command',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name the command'
    }],
    actions: [
        // {
        //     type: 'remove',
        //     path: 'commands/dctor-{{name}}.js'
        // }, 
        {
            type: 'remove-line',
            path: 'commands/dctor.js',
            section: 'commands',
            templateFile: '_templates/cli/command/program_command.hbs',
        }]
}