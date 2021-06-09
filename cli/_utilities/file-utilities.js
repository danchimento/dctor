var fs = require('fs');
const fsPromises = fs.promises;
var path = require('path');

module.exports = {
    getLastElementFromPath: (path) => {
        return path.substring(path.lastIndexOf('/') + 1);
    },
    findTextMatches: (text, regex) => {
        let matches = []
        while ((lineMatch = regex.exec(text)) !== null) {
            matches.push({
                text: lineMatch[0],
                start: lineMatch.index,
                end: regex.lastIndex,
            });
        }

        return matches;
    },
    getFilesInDirectory: async (dir, ignores) => {

        var walk = async (dir) => {
            var results = [];

            // Check if dir should be skipped
            let dirName = dir.substring(dir.lastIndexOf('/') + 1)
            if (ignores && ignores.indexOf(dirName) > -1) {
                return;
            }
            
            console.log('Scanning ', dir)

            let list = await fsPromises.readdir(dir);

            for (var file of list) {
                file = path.resolve(dir, file);
                let stat = await fsPromises.stat(file);
                if (stat && stat.isDirectory()) {
                    let res = await walk(file);
                    results = results.concat(res);
                } else {
                    console.log('Found file: ', file)
                    results.push(file);
                }
            };

            return results;
        };

        return await walk(dir);
    }
}
