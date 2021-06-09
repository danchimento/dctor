const fs = require('fs');

module.exports = function (answers, config, plop) {
    try {
        console.log(answers);
        let path = plop.renderString(config.path, answers);
        console.log(path);
        fs.unlinkSync(path)
    } catch (err) {
        console.log(err);
        throw 'error message';
    }

    // otherwise
    return 'success status message';
}