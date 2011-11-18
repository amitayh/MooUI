Filter.Widget.Default = new Class({

    Extends: Filter.Widget,

    options: {
        template: new MooUI.Template(
            '<select class="filter-widget-operator" name="<%= name %>[operator]"></select>' +
            '<div class="filter-widget-value"></div>'
        ),
        events: {
            'change .filter-widget-operator': 'onOperatorChange'
        },
        bind: {
            '.filter-widget-operator': 'operator',
            '.filter-widget-value': 'value'
        },
        operators: []
    },

    render: function() {
        this.parent();
        this.loadOperators();
    },

    loadOperators: function() {
        var fragment = document.createDocumentFragment();
        this.options.operators.each(function(operator) {
            fragment.appendChild(new Element('option', operator));
        });
        this.operator.appendChild(fragment);
        this.onOperatorChange();
    },

    onOperatorChange: function() {
        var operator = this.operator.get('value').toInt(),
            values = this.value.getElements('input').get('value'),
            context = {name: this.name, values: values},
            template = Filter.Widget.Default.Values[operator];
        this.value.set('html', template.render(context));
        this.fireEvent('operatorChange');
    },

    setValue: function(operator, values) {
        if (this.operator.select(operator)) {
            this.onOperatorChange();
            var inputs = this.value.getElements('input'), input;
            Array.from(values).each(function(value, key) {
                input = inputs[key];
                if (input) {
                    input.set('value', value);
                }
            });
        }
    }

});

(function() {

    var values = Filter.Widget.Default.Values = {};
    var operator = Filter.Operator;

    values[operator.Equals] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.NotEquals] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.GreaterThan] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.GreaterThanEquals] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.LessThan] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.LessThanEquals] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.Between] = new MooUI.Template('<input type="text" name="<%= name %>[]" value="<%= values[0] %>" /> and <input type="text" name="<%= name %>[]" value="<%= values[1] %>" />');
    values[operator.NotBetween] = new MooUI.Template('<input type="text" name="<%= name %>[]" value="<%= values[0] %>" /> and <input type="text" name="<%= name %>[]" value="<%= values[1] %>" />');
    values[operator.Like] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" title="Use percent mark (%) for a wildcard match" />');
    values[operator.NotLike] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" title="Use percent mark (%) for a wildcard match" />');
    values[operator.Contains] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    values[operator.DoesNotContain] = new MooUI.Template('<input type="text" name="<%= name %>" value="<%= values[0] %>" />');
    
})();