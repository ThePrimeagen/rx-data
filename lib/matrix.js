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

/**
 * Multiplys the 2 given matricies together, and returns the resulting matrix
 * Second can be a scalar value as well
 */
function multiply(first, second) {
    var returnMatrix = [];
    if(typeof(second) == "object") {
        if(first[0].length != second.length) {
            throw ('Invalid Matrix Size, (' + first.length + ',' + first[0].length + ') x (' + second.length + ',' + second[0].length + ')');
        }

        for(var i = 0; i < first.length; i++) {
            returnMatrix.push([]);
            for(var j = 0; j < second[0].length; j++) {
                for(var k = 0; k < first[0].length; k++) {
                    returnMatrix[i][j] += first[i][k] * second[k][j];
                }                
            }
        }
    } else {
        for(var i = 0; i < first.length; i++) {
            returnMatrix.push([]);
            for(var j = 0; j < first[0].length; j++) {
                returnMatrix[i].push(first[i][j] * second);
            }
        }
    }

    return returnMatrix;
}

module.exports = {
    getColumns: getColumns,
    arrayToMatrix: arrayToMatrix,
    transform: transform,
    multiply: multiply
}