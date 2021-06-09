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
        type: 'remove-line',
        path: 'plopfile.js',
        templateFile: '_templates/generators/import-generator.hbs',
    }, {
        type: 'remove-line',
        path: 'plopfile.js',
        templateFile: '_templates/generators/add-generator.hbs',
    }]
}