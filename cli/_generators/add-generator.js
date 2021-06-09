module.exports = {
    description: 'Creates a new generator',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Name the generator'
    },{
        type: 'input',
        name: 'description',
        message: 'Describe the generator'
    }],
    actions: [{
       type: 'add',
       path: '_generators/{{name}}.js',
       templateFile: '_templates/generators/generator.hbs' 
    }, {
        type: 'add-line',
        path: 'plopfile.js',
        section: 'imports',
        templateFile: '_templates/generators/import-generator.hbs'
    }, {
        type: 'add-line',
        path: 'plopfile.js',
        section: 'generators',
        templateFile: '_templates/generators/add-generator.hbs'
    }]
}