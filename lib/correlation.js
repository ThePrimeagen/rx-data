var Rx = require('rx');
var data = require('./data');

/**
 * The correlation equation.  Expects arrays to be the same size
 * @param arr1
 * @param arr2
 * @returns {number}
 */
function correlation(arr1, arr2) {
    var sum1 = 0, sum2 = 0, i;
    var avg1 = 0, avg2 = 0, len = arr1.length;

    for (i = 0; i < len; i++) {
        sum1 += arr1[i];
        sum2 += arr2[i];
    }

    avg1 = sum1 / len;
    avg2 = sum2 / len;

    var aSqrSum = 0;
    var bSqrSum = 0;
    var abSum  = 0;
    for (i = 0; i < len; i++) {
        var a = arr1[i] - avg1;
        var b = arr2[i] - avg2;
        aSqrSum += a * a;
        bSqrSum += b * b;
        abSum += a * b;
    }

    return abSum / Math.sqrt(aSqrSum * bSqrSum);
}

module.exports = function(dir, filter, i, j) {
    return data.parseFilesInDirectory(dir, filter)
        .select(function(fileAndContents) {
            var f = fileAndContents[0];
            var fileContents = fileAndContents[1];

            var cols = data.getColumns(fileContents, [i, j]);
            return [f, correlation(cols[0], cols[1])];
        });
};