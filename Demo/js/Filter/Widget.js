Filter.Widget = new Class({

    Extends: MooUI.Component,

    initialize: function(name, field, options) {
        this.name = name;
        this.field = field;
        this.parent(options);
    }
    
});