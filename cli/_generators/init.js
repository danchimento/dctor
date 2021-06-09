// Test comment
module.exports = {
    description: 'Sets up a new project with dctor',
    prompts: [],
    actions: [{
        type: 'add-directory',
        path: '.dctor'
    }, {
        type: 'add-directory',
        path: '.dctor/.cache'
    }, {
        type: 'init-cache'
    }]
};
