const fs = require('fs');
const fsPromises = fs.promises;

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {

        try {
            console.log("Answers: ", answers);
            console.log("Config: ", config);

            // #region code
            const path = plop.renderString(config.path, answers);
            if (!fs.existsSync(path)){
                await fsPromises.mkdir(path);
            }
            // #endregion code
            
            resolve('add-directory finished')

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};