Ext.define( 'CMS.store.ContentTypes', {
    extend: 'Ext.data.Store',

    model: 'CMS.model.ContentType',

    pageSize: 10,
    autoLoad: true,
    remoteSort: true,

    sorters: [
        {
            property : 'name',
            direction: 'ASC'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'app/data/ContentTypes.json',
        reader: {
            type: 'json',
            root: 'contentTypes',
            totalProperty : 'total'
        }
    }
} );