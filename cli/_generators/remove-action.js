// Test comment
module.exports = {
    description: 'Removes an action',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name of the action'
    }],
    actions: [{
        type: 'remove',
        path: '_actions/{{name}}.js',
        abortOnFail: false
    },{
        type: 'remove-line',
        path: 'plopfile.js',
        section: 'imports',
        templateFile: '_templates/generators/import-action.hbs',
        abortOnFail: false
    },{
        type: 'remove-line',
        path: 'plopfile.js',
        section: 'actions',
        templateFile: '_templates/generators/add-action.hbs',
        abortOnFail: false
    }]
};
