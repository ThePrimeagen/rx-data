var correlation = require('./lib/correlation');
var matrix= require('./lib/matrix');
var RxData = {
    correlation: correlation,
    transform: matrix.transform,
    multiply: matrix.multiply,
    add: matrix.add,
    subtract: matrix.subtract
}

module.exports = RxData;
