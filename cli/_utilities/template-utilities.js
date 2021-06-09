const fs = require('fs');
const fsPromises = fs.promises;

module.exports = {

    // Returns an UN-rendered template
    getTemplate: async (answers, config, plop) => {

        if (config.templateFile) {
            console.log("Template file: ", config.templateFile)

            let templatePath = plop.renderString(config.templateFile, answers);
            console.log("Template file (rendered): ", templatePath)

            return `${await fsPromises.readFile(templatePath)}`;
        }

        if (config.template) {
            console.log("Template: ", config.template)

            return config.template;
        }

        return null;
    }
}