const fs = require('fs');

module.exports = function (answers, config, plop) {
    return new Promise((resolve, reject) => {

        try {
            console.log(answers);

            let path = plop.renderString(config.path, answers);
            
            let patternStr = "";
            if (config.pattern) {
                console.log("Deleting by pattern")
                patternStr = config.pattern.source;
            } else if (config.template && config.id) {
                console.log("Deleting by template/id")
                console.log(config.template)
                patternStr = `\/\/ >template:${config.template}#${config.id}\n.*\n\/\/ <template:${config.template}#${config.id}\n`;
            }

            let patternRend = plop.renderString(patternStr, answers);
            console.log(patternRend);
            let pattern = new RegExp(patternRend, "s");

            fs.readFile(path, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }

                let match = data.match(pattern);
                console.log(match);

                var result = data.replace(pattern, '');

                fs.writeFile(path, result, 'utf8', function (err) {
                    if (err) return console.log(err);

                    resolve('Delete successful.')
                });
            });

        } catch (err) {
            console.log(err);
            throw 'error message';
        }
    })
};