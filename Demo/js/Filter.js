var Filter = new Class({

    Extends: MooUI.Component,

    options: {
        template: new MooUI.Template(
            '<select class="filter-field" name="<%= name %>[field]"></select>' +
            '<div class="filter-widget"></div>'
        ),
        events: {
            'change .filter-field': 'onFieldChange'
        },
        bind: {
            '.filter-field': 'field',
            '.filter-widget': 'filterContainer'
        }
    },

    widget: null,

    initialize: function(name, fields, options) {
        this.name = name;
        this.fields = fields;
        this.parent(options);
        this.loadFields();
    },

    loadFields: function() {
        var fragment = document.createDocumentFragment();
        Object.each(this.fields, function(field, value) {
            fragment.appendChild(new Element('option', {value: value, text: field.name}));
        }, this);
        this.field.appendChild(fragment);
        this.onFieldChange();
    },

    onFieldChange: function() {
        var fieldName = this.field.get('value'),
            field = this.fields[fieldName],
            widgetClass;
        widgetClass = Filter.GetWidget(fieldName, field.type);
        this.destroyWidget();
        this.widget = new widgetClass(this.name, field, {inject: this.filterContainer});
        this.fireEvent('fieldChange');
    },

    setValue: function() {
        var args = Array.from(arguments), field = args.shift();
        if (this.field.select(field)) {
            this.onFieldChange();
            this.widget.setValue.apply(this.widget, args);
        }
    },

    destroyWidget: function() {
        if (this.widget) {
            this.widget.destroy();
        }
    },
    
    destroy: function() {
        this.destroyWidget();
        this.parent();
    }
    
});

Filter.FieldType = {
    Other:              0,
    String:             1,
    Integer:            2,
    Float:              3,
    Date:               4,
    Boolean:            5
};

Filter.Operator = {
    Equals:             0,
    NotEquals:          1,
    GreaterThan:        2,
    GreaterThanEquals:  3,
    LessThan:           4,
    LessThanEquals:     5,
    Between:            6,
    NotBetween:         7,
    Like:               8,
    NotLike:            9,
    Contains:           10,
    DoesNotContain:     11
};

Filter.GetWidget = function(fieldName, type) {
    var customWidget = fieldName.capitalize();
    if (Filter.Widget[customWidget]) {
        return Filter.Widget[customWidget];
    }
    switch (type) {
        case Filter.FieldType.Integer:
        case Filter.FieldType.Float:
            return Filter.Widget.Number;
        case Filter.FieldType.Date:
            return Filter.Widget.Date;
        case Filter.FieldType.Boolean:
            return Filter.Widget.Boolean;
        default:
            return Filter.Widget.String;
    }
};