Ext.define('CMS.model.UserFieldModel', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id', type: 'int'},
        {name: 'userstore_id', type: 'int'},
        'fieldname', 'fieldlabel', 'fieldtype', 'readonly', 'required', 'remote'],

    idProperty: 'id'
});
