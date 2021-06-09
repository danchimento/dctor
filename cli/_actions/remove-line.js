const fs = require('fs');
const fsPromises = fs.promises;
const { getFromBetween, escapeRegExp } = require('../_utilities/string-utilities.js');

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log(answers);

            let path = plop.renderString(config.path, answers);
            let templatePath = plop.renderString(config.templateFile, answers);

            console.log(`Template path: ${templatePath}`);
            var template = `${await fsPromises.readFile(templatePath)}`;
            console.log('Template: ', template);

            console.log(`Template content: ${template}`);
            var props = getFromBetween.get(template, "{{", "}}");
            for (var prop of props) {
                if (Object.keys(answers).indexOf(prop) < 0) {
                    template = template.replace(`{{${prop}}}`, '__WILDCARD__');
                } 
            }
            
            console.log("Replaced: ", template);

            template = plop.renderString(template, answers);
            console.log("Rendered: ", template);

            template = escapeRegExp(template);
            console.log("Escaped: ", template);

            template = template.replace('__WILDCARD__', '.*');
            console.log("RegEx String: ", template);

            const templateRegex = new RegExp(template, 's');
            console.log('RegEx: ', templateRegex)

            const fileData = await fsPromises.readFile(path, 'utf8');
            
            const sectionStartIndex = fileData.indexOf(`// #region ${config.section}`);
            console.log(`Section start index (${config.section}): ${sectionStartIndex}`);

            const lineMatch = templateRegex.exec(fileData);
            console.log("Match: " + lineMatch);
            console.log("Match Length: " + lineMatch[0].length);

            const lineStartIndex = lineMatch.index;
            console.log(`Line start index: ${lineStartIndex}`);

            const part1 = fileData.substring(0, lineStartIndex);
            const part2 = fileData.substring(lineStartIndex + lineMatch[0].length + 1);

            const newFileData = part1 + part2;

            await fsPromises.writeFile(path, newFileData, 'utf8');

            resolve('Remove line successful.')

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};