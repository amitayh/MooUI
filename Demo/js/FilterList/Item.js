FilterList.Item = new Class({

    Extends: MooUI.List.Item,

    options: {
        template:
            '<input class="remove-filter" type="button" value="X" title="Remove" />' +
        	'<div class="filter"></div>',
        events: {
        	'click .remove-filter': 'removeFilter',
        },
        bind: {
        	'.filter': ['filter', function(el) {
                return new Filter(this.options.name, this.options.fields, {replaces: el});
            }]
        },
        name: null,
        fields: {}
    },

    render: function() {
        this.parent();
        this.el.addClass('filter-list-item');
    },

    removeFilter: function() {
    	this.list.removeItem(this);
    },

    destroy: function() {
        this.filter.destroy();
        this.parent();
    }

});