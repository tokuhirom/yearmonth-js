"use strict";

subtest('succ', function () {
    var ym = new YearMonth(2011, 10);
    ym.succ();
    is(ym.toString(), '2011-11');
    ym.succ();
    is(ym.toString(), '2011-12');
    ym.succ();
    is(ym.toString(), '2012-01');
    ym.succ();
    is(ym.toString(), '2012-02');
});

subtest('list ym', function () {
    is(stringifyList(YearMonth.getList(new YearMonth(2011, 11), new YearMonth(2011, 11))), '2011-11');
    is(stringifyList(YearMonth.getList(new YearMonth(2011, 11), new YearMonth(2011, 12))), '2011-11,2011-12');
    is(stringifyList(YearMonth.getList(ym('2011-11'), ym('2011-12'))), '2011-11,2011-12');
    is(stringifyList(YearMonth.getList(new YearMonth(2008, 1), new YearMonth(2010, 11))), '2008-01,2008-02,2008-03,2008-04,2008-05,2008-06,2008-07,2008-08,2008-09,2008-10,2008-11,2008-12,2009-01,2009-02,2009-03,2009-04,2009-05,2009-06,2009-07,2009-08,2009-09,2009-10,2009-11,2009-12,2010-01,2010-02,2010-03,2010-04,2010-05,2010-06,2010-07,2010-08,2010-09,2010-10,2010-11');
});

subtest('toString', function () {
    is(''+(new YearMonth(2011,  1)), '2011-01');
    is(''+(new YearMonth(2011, 12)), '2011-12');
});

subtest('clone', function () {
    var orig = new YearMonth(2011, 1);
    var d = orig.clone();
    is(d.year,  2011);
    is(d.month, 1);
    orig.succ();
    is(orig.year,  2011);
    is(orig.month, 2, 'not modified');
    is(d.year,  2011);
    is(d.month, 1);
});
subtest('>', function () {
    var gt = YearMonth['>'];
    is(gt(ym('2011-11'), ym('2011-11')), false);
    is(gt(ym('2011-10'), ym('2011-11')), false);
    is(gt(ym('2011-12'), ym('2011-11')), true);

    is(gt(ym('2010-12'), ym('2011-11')), false);
    is(gt(ym('2012-01'), ym('2011-12')), true);
});
subtest('>=', function () {
    var ge = YearMonth['>='];
    is(ge(ym('2011-11'), ym('2011-11')), true);
    is(ge(ym('2011-10'), ym('2011-11')), false);
    is(ge(ym('2011-12'), ym('2011-11')), true);

    is(ge(ym('2010-12'), ym('2011-11')), false);
    is(ge(ym('2012-01'), ym('2011-12')), true);
});
subtest('<', function () {
    var lt = YearMonth['<'];
    is(lt(ym('2011-11'), ym('2011-11')), false);
    is(lt(ym('2011-10'), ym('2011-11')), true);
    is(lt(ym('2011-12'), ym('2011-11')), false);

    is(lt(ym('2010-12'), ym('2011-11')), true);
    is(lt(ym('2012-01'), ym('2011-12')), false);
});
subtest('<=', function () {
    var le = YearMonth['<='];
    is(le(ym('2011-11'), ym('2011-11')), true);
    is(le(ym('2011-10'), ym('2011-11')), true);
    is(le(ym('2011-12'), ym('2011-11')), false);

    is(le(ym('2010-12'), ym('2011-11')), true);
    is(le(ym('2012-01'), ym('2011-12')), false);
});
subtest('strftime', function () {
    is(ym('2011-11').strftime('%Y年%m月'), '2011年11月');
    is(ym('2011-01').strftime('%Y年%m月'), '2011年01月');
});

function ym(s) {
    var y = s.split('-')[0];
    var m = parseInt(s.split('-')[1], 10);
    return new YearMonth(y, m);
}

function stringifyList(dat) {
    var ret = new Array();
    for (var i=0, l=dat.length; i<l; i++) {
        ret.push(dat[i].toString());
    }
    return ret.join(',');
}
