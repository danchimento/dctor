module.exports = {
    description: 'Removes a new generator',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name the generator'
    }],
    actions: [{
       type: 'remove',
       path: '_generators/{{name}}.js',
       abortOnFail: false,
    }, {
        type: 'delete',
        path: 'plopfile.js',
        pattern: /const {{camelCase name}} = require\('\.\/_generators\/{{name}}'\);?\n?\t?/s,
        abortOnFail: false,
    }, {
        type: 'delete',
        path: 'plopfile.js',
        pattern: /plop\.setGenerator\('{{name}}', {{camelCase name}}\);?\n?\t?/s,
        abortOnFail: false,
    }]
}