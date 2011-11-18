MooUI.Component = new Class({

    Implements: [Options, Events],

    options: {
        tagName: 'div.mooui-component',
        attributes: {},
        events: {},
        bind: {},
        template: null,
        adopt: null,
        inject: null
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
        if (this.options.adopt) {
            this.el.adopt(this.options.adopt);
        }
        if (this.options.inject) {
            this.el.inject(this.options.inject);
        }
        this.fireEvent('render');
    },

    createElement: function() {
        var tpl = this.options.template, html;
        this.el = new Element(this.options.tagName, this.options.attributes);
        if (tpl) {
            html = instanceOf(tpl, MooUI.Template) ? tpl.render(this) : tpl;
            this.el.set('html', html);
        }
    },

    delegateEvents: function() {
        Object.each(this.options.events, function(callback, event) {
            var parts = event.split(' '), type = parts.shift();
            if (parts.length) {
                // Use event delegation
                type += ':relay(' + parts.join(' ') + ')';
            }
            if (this[callback]) {
                this.el.addEvent(type, this[callback].bind(this));
            }
        }, this);
    },

    bindElements: function() {
        Object.each(this.options.bind, function(property, selector) {
            var el = this.el.getElement(selector);
            if (el) {
                this[property] = el;
            }
        }, this);
    },

    destroy: function() {
        this.el.destroy();
        this.fireEvent('destroy');
    }
    
});