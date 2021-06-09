// Test comment
module.exports = {
    description: 'Creates a new plop action',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name of the action'
    }],
    actions: [{
        type: 'add',
        path: '_actions/{{name}}.js',
        templateFile: '_templates/generators/action.hbs'
    }, {
        type: 'add-line',
        path: 'plopfile.js',
        section: 'imports',
        templateFile: '_templates/generators/import-action.hbs'
    }, {
        type: 'add-line',
        path: 'plopfile.js',
        section: 'actions',
        templateFile: '_templates/generators/add-action.hbs'
    }]
};
