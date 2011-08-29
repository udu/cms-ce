Ext.define( 'App.view.UserstoreFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userstoreFormPanel',

    requires: [
        'App.view.UserstoreForm',
        'App.view.UserstoreFormDetail'
    ],

    title: 'New Userstore',
    layout: 'border',
    defaults: {
        padding: 10,
        style: 'background: #fff;'
    },

    initComponent: function() {

        this.items = [
            {
                xtype: 'panel',
                region: 'west',
                border: 0,
                width: 170,
                items: [
                    {
                        // TODO: Create an Ext component.
                        xtype: 'image',
                        src: 'resources/images/app-icon.png',
                        width: 150
                    }
                ]
            },
            {
                xtype: 'userstoreForm',
                region: 'center',
                userstore: this.userstore,
                flex: 3
            },
            {
                xtype: 'userstoreFormDetail',
                region: 'east',
                userstore: this.userstore,
                flex: 1
            }
        ],

        this.callParent( arguments );

    }

});