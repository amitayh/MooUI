var FilterList = new Class({

    Extends: MooUI.Component,

    options: {
        template:
            '<div class="list-container"></div>' +
            '<p>' +
                '<input type="button" class="add-filter" value="+ Add filter" /> | ' +
                '<input type="button" class="clear-filters" value="Clear filters" disabled="disabled" />' +
            '</p>',
        events: {
            'click .add-filter': 'addFilter',
            'click .clear-filters': 'clearFilters'
        },
        bind: {
            '.list-container': 'listContainer',
            '.clear-filters': 'clearFiltersButton'
        },
        itemOptions: {}
    },

    filters: 0,

    initialize: function(name, options) {
        this.name = name;
        this.parent(options);

        this.el.addClass('filter-list');

        this.list = new MooUI.List({inject: this.listContainer});

        var checkClearButton = function() {
            var items = this.list.items.length;
            this.clearFiltersButton.set('disabled', !items);
            $(this.list)[items ? 'addClass' : 'removeClass']('has-items');
        }.bind(this);
        
        this.list.addEvents({
            addItem: checkClearButton,
            removeItem: checkClearButton
        });
    },

    addFilter: function() {
        var id = this.filters++,
            name = this.name + '[' + id + ']',
            item = new FilterList.Item(name, this.options.itemOptions);
        this.list.addItem(item);
    },

    clearFilters: function() {
        this.list.clearItems();
    }

});