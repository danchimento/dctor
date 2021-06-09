const fs = require('fs');
const fsPromises = fs.promises;

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log(answers);

            let path = plop.renderString(config.path, answers);
            let templatePath = plop.renderString(config.templateFile, answers);
            var template = await fsPromises.readFile(templatePath);
            var templateRendered = plop.renderString(`${template}`, answers);
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