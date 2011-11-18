FilterList.Item = new Class({

    Extends: MooUI.List.Item,

    options: {
        template: new MooUI.Template(
        	'<select class="filter-field" name="<%= name %>[field]"></select>' +
        	'<div class="filter-container"></div>' +
        	'<input class="remove-filter" type="button" value="X" />'
        ),
        events: {
        	'click .remove-filter': 'removeFilter',
        	'change .filter-field': 'onFieldChange'
        },
        bind: {
        	'.filter-container': 'filterContainer'
        }
    },

    filter: null,

    initialize: function(name, options) {
        this.name = name;
        this.parent(options);
        this.onFieldChange();
    },

    removeFilter: function() {
    	this.list.removeItem(this);
    },

    onFieldChange: function() {
    	if (this.filter) {
    		this.filter.destroy();
    	}
    	this.filter = new Filter({inject: this.filterContainer});
    	this.fireEvent('fieldChange');
    }

});