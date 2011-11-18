Filter.Widget.Boolean = new Class({

    Extends: Filter.Widget,

    options: {
    	template: new MooUI.Template(
    		'<input type="hidden" name="<%= filter.name %>[operator]' + '" value="<%= Filter.Operator.Equals %>" />' +
    		'<label><input type="checkbox" name="<%= filter.name %>[value]" value="1" /> True</label>'
    	)
    }

});