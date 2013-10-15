/** 
 * Transforms an array from rowxcol to colxrow
 */
function transform(d) {
    var len = d[0].length;
    var cols = [];
    for (var i = 0; i < len; i++) {
        cols.push(i);
    }

    return getColumns(d, cols);
},

/**
 * Transforms a single array into a 2d array as a matrix.
 * @param  {Array} arr
 * @param  {Number} n
 * @return {Array[]}
 */
function arrayToMatrix(arr, n) {
    var table = [];
    for (var i = 0; i < arr.length; i += n) {
        table.push(arr.slice(i, n));
    }
    return table;
}

/**
 * Gets columns from the data.  d should be an array of arrays and columns should be
 * a set of column indices needed
 * @param {Array.<Number[]>}
 * @param {Number[]} columns
 */
function getColumns(d, columns) {
    var cols = [];
    for (var i = 0; i < columns.length; i++) {
        cols.push([]);
    }

    for (var dIdx = 0; dIdx < d.length; dIdx++) {
        for (var colIdx = 0; colIdx < columns.length; colIdx++) {
            cols[colIdx].push(d[dIdx][columns[colIdx]]);
        }
    }

    return cols;
}

module.exports = {
    getColumns: getColumns,
    arrayToMatrix: arrayToMatrix,
    transform: transform
}