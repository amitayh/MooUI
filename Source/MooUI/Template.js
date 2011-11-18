/**
 * Simple JavaScript Templating
 * John Resig - http://ejohn.org/ - MIT Licensed
 */
MooUI.Template = new Class({

    Implements: Options,

    options: {
        autoescape: true
    },

    template: null,

    compiled: null,
    
    initialize: function(template, options) {
        this.setOptions(options);
        this.template = template;
    },

    render: function(context) {
        if (!this.compiled) {
            this.compile();
        }
        return this.compiled(context || {});
    },

    compile: function() {
        var template = this.template, modifier = '';

        // Figure out the template string
        if (typeOf(template) == 'element') {
            template = template.get('html');
        }

        // Handle auto escape
        if (this.options.autoescape) {
            modifier = '.toString().htmlentities()';
        }

        /**
         * Generate a reusable function that will serve as a template
         * generator (and which will be cached).
         */
        this.compiled = new Function('obj',
            "var p=[];with(obj){p.push('" +
            template
                .replace(/[\r\t\n]/g, ' ')
                .split('<%').join('\t')
                .replace(/((^|%>)[^\t]*)'/g, '$1\r')
                .replace(/\t=\s*?(\S*?)\s*?%>/g, "',($1!=undefined?$1" + modifier + ":''),'")
                .split('\t').join("');")
                .split('%>').join("p.push('")
                .split('\r').join("\\'") +
            "');}return p.join('');"
        );
    }

});

String.implement({

    htmlentities: function() {
        return this.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
    }

});