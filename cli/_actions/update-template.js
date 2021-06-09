const fs = require('fs');
const fsPromises = fs.promises;
const fileUtilities = require('../_utilities/file-utilities');
const stringUtilities = require('../_utilities/string-utilities');
const templateUtilities = require('../_utilities/template-utilities');

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(answers);

            let ignoreDirectories = ['node_modules', '_templates', '.dctor'];
            let files = await fileUtilities.getFilesInDirectory('./', ignoreDirectories);

            console.log('Found files: ', files.length);

            const newTemplate = `${await fsPromises.readFile(answers.templatePath)}`;

            const templateName = fileUtilities.getLastElementFromPath(answers.templatePath);
            const cachedTemplatePath = `.dctor/.cache/${templateName}`;
            var template = `${await fsPromises.readFile(cachedTemplatePath)}`;
            console.log('Template: ', template);

            var props = stringUtilities.getFromBetween.get(template, "{{", "}}");

            template = template.replace(/{{[a-zA-Z0-9\s]+}}/gi, "__WILDCARD__");
            console.log('Prepared: ', template);

            template = stringUtilities.escapeRegExp(template);
            console.log('Escaped: ', template);

            template = template.replace(/__WILDCARD__/gi, '(.*)');
            console.log('Replaced: ', template);

            var templateRegex = new RegExp(template, 'g');
            console.log("Template Regex: ", templateRegex);

            for (var file of files) {
                if (!file) {
                    continue;
                }

                var data = await fsPromises.readFile(file, 'utf8');
                console.log(`Searching for match...`);


                let matches = []
                while ((match = templateRegex.exec(data)) !== null) {
                    console.log('Match found: ', match);
                    matches.push(match);
                }
                
                if (matches.length <= 0) {
                    continue;
                }

                console.log('Found matches: ', matches.length);

                for (var match of matches) {
                    let originalAnswers = {};
                    for (var i = 0; i < props.length; i++) {
                        const prop = props[i];
                        const val = match[i + 1];

                        originalAnswers[prop] = val;
                    }

                    const escapedMatch = stringUtilities.escapeRegExp(match[0]);
                    const regexMatch = new RegExp(escapedMatch);
                    const renderedNewTemplate = plop.renderString(newTemplate, originalAnswers);

                    data = data.replace(regexMatch, renderedNewTemplate);
                    console.log("Original Answers: ", originalAnswers);
                }
                
                await fsPromises.writeFile(file, data);
                await fsPromises.writeFile(cachedTemplatePath, newTemplate);
            }


            resolve();

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}