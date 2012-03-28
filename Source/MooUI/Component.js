/*
---

description: Base UI component class

license: MIT-style

authors:
- Amitay Horwitz

requires:
- MooUI

provides:
- MooUI.Component

...
*/

MooUI.Component = new Class({

    Implements: [Options, Events],

    options: {
        tag: 'div.mooui-component',
        attributes: {},
        events: {},
        bind: {},
        template: null
    },

    el: null,

    initialize: function(options) {
        this.setOptions(options);
        this.render();
    },

    toElement: function() {
        if (!this.el) {
            this.render();
        }
        return this.el;
    },

    render: function() {
        this.createElement();
        this.delegateEvents();
        this.bindElements();
        Object.each(this.options, function(value, name) {
            var prop = this.el[name];
            if (prop && typeOf(prop) == 'function') {
                prop.call(this.el, value);
            }
        }, this);
        this.fireEvent('render');
    },

    createElement: function() {
        var tpl = this.options.template, html;
        this.el = new Element(this.options.tag, this.options.attributes);
        if (tpl) {
            html = instanceOf(tpl, MooUI.Template) ? tpl.render(this) : tpl;
            this.el.set('html', html);
        }
    },

    delegateEvents: function() {
        Object.each(this.options.events, function(callback, event) {
            if (typeOf(callback) == 'string') {
                callback = this[callback];
            }
            if (typeOf(callback) == 'function') {
                var parts = event.split(' '), type = parts.shift();
                if (parts.length) {
                    // Use event delegation
                    type += ':relay(' + parts.join(' ') + ')';
                }
                this.el.addEvent(type, callback.bind(this));
            }
        }, this);
    },

    bindElements: function() {
        Object.each(this.options.bind, function(options, selector) {
            var el = this.el.getElements(selector), count = el.length, name, property;
            if (count) {
                options = Array.from(options);
                name = options[0];
                property = (count == 1) ? el[0] : el;
                if (options[1] && typeOf(options[1]) == 'function') {
                    property = options[1].call(this, property);
                }
                this[name] = property;
            }
        }, this);
    },

    destroy: function() {
        this.el.destroy();
        this.fireEvent('destroy');
    }

});