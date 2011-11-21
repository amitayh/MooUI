/*
---

description: Base list component

license: MIT-style

authors:
- Amitay Horwitz

requires:
- MooUI

provides:
- MooUI.List

...
*/

MooUI.List = new Class({

    Extends: MooUI.Component,

    options: {
        tag: 'ul.mooui-component.mooui-list'
    },

    items: [],

    addItems: function() {
        Array.from(arguments).each(function(item) {
            this.addItem(item);
        }, this);
        return this;
    },

    addItem: function(item) {
        item.list = this;
        this.items.push(item);
        document.id(item).inject(this.el);
        this.fireEvent('addItem', item);
        return this;
    },

    removeItems: function() {
        Array.from(arguments).each(function(item) {
            this.removeItem(item);
        }, this);
        return this;
    },

    removeItem: function(item) {
        this.items.erase(item);
        this.fireEvent('removeItem', item);
        item.destroy();
        return this;
    },

    clearItems: function() {
        return this.removeItems.apply(this, this.items);
    },

    destroy: function() {
        this.clearItems();
        this.parent();
    }

});