window.addEvent('domready', function() {

    var fields = {
        string: {name: 'String field', type: Filter.FieldType.String},
        number: {name: 'Number field', type: Filter.FieldType.Integer},
        date: {name: 'Date field', type: Filter.FieldType.Date}
        //bool: {name: 'Boolean field', type: Filter.FieldType.Boolean}
    };
    
    new FilterList('filters', {
        itemOptions: {fields: fields},
        inject: $(document.body)
    });

});