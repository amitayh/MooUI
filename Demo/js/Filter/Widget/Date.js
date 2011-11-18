Filter.Widget.Date = new Class({

    Extends: Filter.Widget.Default,

    options: {
        operators: [
            {value: Filter.Operator.Equals, html: 'on'},
            {value: Filter.Operator.GreaterThan, html: 'after'},
            {value: Filter.Operator.LessThan, html: 'before'},
            {value: Filter.Operator.Between, html: 'between'},
            {value: Filter.Operator.NotBetween, html: 'not between'}
        ],
    }

});