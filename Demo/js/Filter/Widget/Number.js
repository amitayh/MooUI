Filter.Widget.Number = new Class({

    Extends: Filter.Widget.Default,

    options: {
    	operators: [
            {value: Filter.Operator.Equals, html: '='},
            {value: Filter.Operator.NotEquals, html: '&ne;'},
            {value: Filter.Operator.GreaterThan, html: '&gt;'},
            {value: Filter.Operator.GreaterThanEquals, html: '&ge;'},
            {value: Filter.Operator.LessThan, html: '&lt;'},
            {value: Filter.Operator.LessThanEquals, html: '&le;'},
            {value: Filter.Operator.Between, html: 'between'},
            {value: Filter.Operator.NotBetween, html: 'not between'}
        ]
    }

});