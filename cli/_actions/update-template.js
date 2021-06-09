var fs = require('fs');
var path = require('path');

let ignores = [
    'node_modules',
    '_templates',
]

module.exports = function (answers, config, plop) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(answers);

            let files = await getFilesInDirectory('./');
            console.log('Found files...');
            console.log(files);
            
            for (var file of files) {
                if (!file) {
                    continue;
                }

                fs.readFile(file, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
    
                    // Find all uses of the template in this file
                    let pattern = new RegExp(`\/\/ >template:${answers.name}#(.[^\n]*)\n.*\n\/\/ <template:${answers.name}#` + "\\1" + `\n`, 'g');
                    
                    console.log(`Searching for match of ${pattern}`);

                    let matches = [...data.matchAll(pattern)];
                    if (matches) {
                        console.log('Match found!', matches);
                    }
                });
            }
            
            resolve();

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


function getFilesInDirectory(dir) {
    var walk = function (dir, done) {
        var results = [];

        // Check if dir should be skipped
        let dirName = dir.substring(dir.lastIndexOf('/') + 1)
        if (ignores.indexOf(dirName) > -1) {
            done();
        }

        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            var pending = list.length;
            if (!pending) return done(null, results);
            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (err, res) {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    };

    return new Promise((resolve, reject) => {
        walk('./', function (err, results) {
            if (err)  {
                reject(err);
            }

            resolve(results);
        });
    })
}
