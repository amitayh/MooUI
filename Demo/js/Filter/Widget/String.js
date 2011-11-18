Filter.Widget.String = new Class({

    Extends: Filter.Widget.Default,

    options: {
        operators: [
            {value: Filter.Operator.Contains, html: 'contains'},
            {value: Filter.Operator.DoesNotContain, html: "doesn't contain"},
            {value: Filter.Operator.Equals, html: 'is'},
            {value: Filter.Operator.NotEquals, html: 'is not'}
        ]
    }

});