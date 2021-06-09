const fs = require('fs');
const fsPromises = fs.promises;
const { getFromBetween, escapeRegExp } = require('../_utilities/string-utilities.js');
const fileUtilites = require('../_utilities/file-utilities');
const templateUtilities = require('../_utilities/template-utilities');

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log(answers);

            let path = plop.renderString(config.path, answers);

            var template = `${await templateUtilities.getTemplate(answers, config, plop)}`;

            var props = getFromBetween.get(template, "{{", "}}");
            for (var prop of props) {
                if (Object.keys(answers).indexOf(prop) < 0) {
                    template = template.replace(`{{${prop}}}`, '__WILDCARD__');
                }
            }

            template = plop.renderString(template, answers);
            template = escapeRegExp(template);
            template = template.replace('__WILDCARD__', '.*');

            const templateRegex = new RegExp(template, 'g');

            var fileData = await fsPromises.readFile(path, 'utf8');

            let matches = fileUtilites.findTextMatches(fileData, templateRegex);

            // TODO: Extract to utility: Remove text
            for (i = matches.length - 1; i >= 0; i --) {
                let lineMatch = matches[i];
                console.log("Match: ", JSON.stringify(lineMatch));
                console.log(`Removing line: ${lineMatch[0]}`);

                const part1 = fileData.substring(0, lineMatch.start);
                const part2 = fileData.substring(lineMatch.end + 1);

                fileData = part1 + part2;
            }

            await fsPromises.writeFile(path, fileData, 'utf8');

            resolve('Remove line successful.')

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};