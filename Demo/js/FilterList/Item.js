FilterList.Item = new Class({

    Extends: MooUI.List.Item,

    options: {
        template:
            '<input class="remove-filter" type="button" value="X" title="Remove" />' +
        	'<div class="filter-container"></div>',
        events: {
        	'click .remove-filter': 'removeFilter',
        },
        bind: {
        	'.filter-container': 'filterContainer'
        },
        fields: {}
    },

    initialize: function(name, options) {
        this.parent(options);
        this.el.addClass('filter-list-item');
        this.filter = new Filter(name, this.options.fields, {inject: this.filterContainer});
    },

    removeFilter: function() {
    	this.list.removeItem(this);
    },

});