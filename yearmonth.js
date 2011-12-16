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
        if (YearMonth['>'](a, b)) {
            y = b;
            x = a;
        } else {
            y = a;
            x = b;
        }
        while (YearMonth['>='](x, y)) {
            ret.push(y.clone());
            y.succ();
        }
        return ret;
    };
    YearMonth['>'] = function (a, b) { // gt
        if (a.year === b.year) {
            return a.month > b.month;
        } else {
            return a.year > b.year;
        }
    };
    YearMonth['>='] = function (a, b) {
        if (a.year === b.year) {
            return a.month >= b.month;
        } else {
            return a.year  >= b.year;
        }
    };
    YearMonth['<'] = function (a, b) {
        return !YearMonth['>='](a, b);
    };
    YearMonth['<='] = function (a, b) {
        return !YearMonth['>'](a, b);
    };

    Y.YearMonth = YearMonth;
})();
