var rx_fs = require('rxjs-fs');
var Rx = require('rx');
var _ = require('lodash');

function getFilesObs(dir, filter) {
    return Rx.Observable.create(function(observer) {
        Rx.fs.readdir(dir).subscribe(function(files) {
            for (var k in files) {
                if (!filter || files[k].indexOf(filter) > 0) {
                    observer.onNext(files[k]);
                }
            }
            observer.onCompleted();
        });
    });
}

/**
 * @param {String} file
 */
function parseFileObs(file) {
    return Rx.Observable.create(function(observer) {
        Rx.fs.readfile(file).subscribe(function(contents) {
            var d = contents.file.split('\n');
            var parsedData = [];
            for (var k in d) {
                var splitData = d[k].split(',');
                if (splitData.length > 1) {
                    parsedData.push(_.map(splitData, function(k) { return Number(k); }));
                }
            }

            observer.onNext([contents.name, parsedData]);
            observer.onCompleted();
        });
    });
}

module.exports = {
    parseFilesInDirectory: function(dir, filter) {
        return getFilesObs(dir, filter)
            .select(parseFileObs)
            .concatAll();
    }
};