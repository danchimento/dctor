const fs = require('fs')

module.exports = function (plop) {
    plop.setActionType('remove', function (answers, config, plop) {
        try {
            console.log(answers);
            let path = plop.renderString(config.path, answers);
            console.log(path);
            fs.unlinkSync(path)
        } catch (err) {
            console.log(err);
            throw 'error message';
        }

        // otherwise
        return 'success status message';
    });

    plop.setActionType('delete', function (answers, config, plop) {
        try {
            console.log(answers);

            let path = plop.renderString(config.path, answers);
            let patternStr = config.pattern.source;
            let patternRend = plop.renderString(patternStr, answers);
            let pattern = new RegExp(patternRend, "g");

            fs.readFile(path, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(pattern, '');

                fs.writeFile(path, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            });

        } catch (err) {
            console.log(err);
            throw 'error message';
        }

        // otherwise
        return 'success status message';
    });

    // create your generators here
    plop.setGenerator('add-command', {
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
        actions: [{
            type: 'add',
            path: 'commands/dctor-{{name}}.js',
            templateFile: '_templates/cli/command/command.hbs'
        }, {
            type: 'append',
            path: 'commands/dctor.js',
            pattern: '>commands',
            template: 'program.command(\'{{name}}\', \'{{description}}\')'
        }]
    });

    plop.setGenerator('remove-command', {
        description: 'Removes a command',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name the command'
        }],
        actions: [
            {
                type: 'remove',
                path: 'commands/dctor-{{name}}.js'
            }, 
            {
                type: 'delete',
                path: 'commands/dctor.js',
                pattern: /program\.command\('{{name}}', '(.*)'\);+\n+/s,
                template: ''
            }]
    });
};
