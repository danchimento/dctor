module.exports = {
    description: 'Updates a template and all code that uses it',
    prompts: [{
        type: 'input',
        name: 'templatePath',
        message: 'Path to template to update'
    }],
    actions: [{
        type: 'update-template',
    }]
};