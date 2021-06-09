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
       templateFile: '_templates/generator.hbs' 
    }, {
        type: 'append',
        path: 'plopfile.js',
        pattern: '>imports',
        template: 'const {{camelCase name}} = require(\'./_generators/{{name}}\');'
    }, {
        type: 'append',
        path: 'plopfile.js',
        pattern: '>generators',
        template: '\tplop.setGenerator(\'{{name}}\', {{camelCase name}});'
    }]
}