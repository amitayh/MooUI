MooUI.Component = new Class({

    Implements: [Options, Events],

    options: {
        tag: 'div.mooui-component',
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
        this.el = new Element(this.options.tag, this.options.attributes);
        if (tpl) {
            html = instanceOf(tpl, MooUI.Template) ? tpl.render(this) : tpl;
            this.el.set('html', html);
        }
    },

    delegateEvents: function() {
        Object.each(this.options.events, function(callback, event) {
            if (this[callback]) {
                var parts = event.split(' '), type = parts.shift();
                if (parts.length) {
                    // Use event delegation
                    type += ':relay(' + parts.join(' ') + ')';
                }
                this.el.addEvent(type, this[callback].bind(this));
            }
        }, this);
    },

    bindElements: function() {
        Object.each(this.options.bind, function(property, selector) {
            var el = this.el.getElements(selector), length = el.length;
            if (length) {
                this[property] = (length == 1) ? el[0] : el;
            }
        }, this);
    },

    destroy: function() {
        this.el.destroy();
        this.fireEvent('destroy');
    }
    
});