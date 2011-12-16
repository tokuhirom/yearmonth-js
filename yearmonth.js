(function () {
    var global = this;
    var Y;
    if (typeof exports !== 'undefined') {
        Y = exports;
    } else {
        Y = window;
    }

    var YearMonth = function (y, m) {
        this.year = y;
        this.month = m;
        if (this.month < 1 || 12 < this.month ) {
            throw new RangeError();
        }
    };
    YearMonth.prototype = {
        succ: function () {
            if (this.month === 12) {
                this.year = this.year + 1;
                this.month = 1;
            } else {
                this.month = this.month + 1;
            }
        },
        clone: function () {
            return new YearMonth(this.year, this.month);
        },
        _pat_month: function () {
            var m = this.month;
                m = (''+m).length === 1 ? '0' + m : m;
            return m;
        },
        toString: function () {
            return this.year + '-' + this._pat_month();
        },
        strftime: function (pat) {
            return pat.replace('%Y', this.year).replace('%m', this._pat_month());
        }
    };
    YearMonth.getList = function (a, b) {
        var x,
            y, // early
            ret = new Array();

        if (gt(a, b)) {
            y = b; x = a;
        } else {
            y = a; x = b;
        }

        while (ge(x, y)) {
            ret.push(y.clone());
            y.succ();
        }
        return ret;
    };
    function gt(a, b) { // gt
        if (a.year === b.year) {
            return a.month > b.month;
        } else {
            return a.year > b.year;
        }
    }
    YearMonth['>'] = gt;
    YearMonth['gt'] = gt;

    function ge(a, b) {
        if (a.year === b.year) {
            return a.month >= b.month;
        } else {
            return a.year  >= b.year;
        }
    }
    YearMonth['>='] = ge;
    YearMonth['ge'] = ge;

    function lt(a, b) { // <
        return !YearMonth['>='](a, b);
    }
    YearMonth['<']  = lt;
    YearMonth['lt'] = lt;

    function le(a, b) {
        return !YearMonth['>'](a, b);
    }
    YearMonth['<='] = le;
    YearMonth['le'] = le;

    YearMonth.max = function () {
        if (arguments.length === 0) {
            return undefined;
        }
        var ret = arguments[0];
        for (var i=1, l=arguments.length; i<l; i++) {
            if (lt(ret, arguments[i])) {
                ret = arguments[i];
            }
        }
        return ret;
    };

    Y.YearMonth = YearMonth;
})();
