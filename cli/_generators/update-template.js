module.exports = {
    description: 'Updates a template and all code that uses it',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Template to update'
    }],
    actions: [{
        type: 'update_template',
    }]
};