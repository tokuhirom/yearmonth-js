var QUnit = require('./qunit').QUnit,
    qunitTap = require('qunit-tap').qunitTap,
    sys = require('sys'),
    fs = require('fs');

qunitTap(QUnit, sys.puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

var YM = require('../yearmonth');
with ({is: QUnit.equal, subtest: QUnit.test, YearMonth: YM.YearMonth, is_deeply: QUnit.deepEqual}) {
    var content = fs.readFileSync('t/01_basic.js', 'utf-8');
    eval(content);
}

QUnit.start();
