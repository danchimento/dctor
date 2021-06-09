const fs = require('fs');
const fsPromises = fs.promises;
const fileUtilities = require('../_utilities/file-utilities');

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log('init-cache starting...');
            console.log("Answers: ", answers);
            console.log("Config: ", config);

            // #region code
            let files = await fileUtilities.getFilesInDirectory('_templates');
            console.log("Found files to copy: ", files.length)

            for (var file of files) {
                console.log("Copying file: ", file)
                let fileName = fileUtilities.getLastElementFromPath(file);

                await fsPromises.copyFile(file, './.dctor/.cache/' + fileName);
            }
            // #endregion code
            
            resolve('init-cache finished')

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};