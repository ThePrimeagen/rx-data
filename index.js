var correlation = require('./lib/correlation');
var matrix= require('./lib/matrix');
var RxData = {
    correlation: correlation,
    transform: matrix.transform
};

module.exports = RxStats;
