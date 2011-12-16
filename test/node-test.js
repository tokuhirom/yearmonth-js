var QUnit = require('./qunit').QUnit,
    qunitTap = require('qunit-tap').qunitTap,
    util = require('util'),
    fs = require('fs');

qunitTap(QUnit, util.puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

var YM = require('../yearmonth');
with ({is: QUnit.equal, subtest: QUnit.test, YearMonth: YM.YearMonth, is_deeply: QUnit.deepEqual}) {
    var content = fs.readFileSync('t/01_basic.js', 'utf-8');
    eval(content);
}

QUnit.start();
