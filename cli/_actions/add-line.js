const fs = require('fs');
const fsPromises = fs.promises;
const templateUtilities = require('../_utilities/template-utilities');

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log("Answers: ", answers);
            console.log("Config: ", config);

            let path = plop.renderString(config.path, answers);
            console.log("Path (rendered): ", path);

            var template = await templateUtilities.getTemplate(answers, config, plop);
            console.log("Template: ", template);

            var templateRendered = plop.renderString(`${template}`, answers);
            console.log("Template (rendered): ", templateRendered);

            var fileData = await fsPromises.readFile(path, 'utf8');
            
            var sectionEndIndex = fileData.indexOf(`// #endregion ${config.section}`);
            const part1 = fileData.substring(0, sectionEndIndex);
            const part2 = fileData.substring(sectionEndIndex);

            const newFileData = part1 + templateRendered + "\n" + part2;

            await fsPromises.writeFile(path, newFileData, 'utf8');

            resolve('Add line successful.')

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};