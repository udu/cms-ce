Ext.define('App.model.UserstoreConnectorModel', {
    extend: 'Ext.data.Model',

    idProperty: 'name',

    fields: [
        'name', 'pluginType',
        {name: 'canCreateUser', type: 'boolean', defaultValue: false },
        {name: 'canUpdateUser', type: 'boolean', defaultValue: false },
        {name: 'canUpdateUserPassword', type: 'boolean', defaultValue: false },
        {name: 'canDeleteUser', type: 'boolean', defaultValue: false },
        {name: 'canCreateGroup', type: 'boolean', defaultValue: false },
        {name: 'canUpdateGroup', type: 'boolean', defaultValue: false },
        {name: 'canReadGroup', type: 'boolean', defaultValue: false },
        {name: 'canDeleteGroup', type: 'boolean', defaultValue: false },
        {name: 'groupsLocal', type: 'boolean', defaultValue: true }
    ]
});
