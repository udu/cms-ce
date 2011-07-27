Ext.define( 'CMS.view.user.EditUserFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editUserFormPanel',

    defaults: {
        bodyPadding: 10
    },

    autoScroll: true,

    title: 'User',
    modal: true,

    layout: {
        type: 'table',
        columns: 2,
        defaultMargins: {top:10, right:10, bottom:10, left:10},
        padding: 10,
        tdAttrs: {
            style:{
                padding: '10px'
            }
        }
    },
    currentUser: undefined,
    defaultUserStoreName: 'default',

    buttons: [
        {
            text: 'Cancel',
            scope: this,
            handler: this.close
        },
        {
            text: 'Save',
            action: 'deleteUser'
        }
    ],

    listeners: {
        afterrender: function( me )
        {
            me.el.mask( "Loading..." );
            Ext.Ajax.request( {
                url: 'data/userstore/detail',
                method: 'GET',
                params: {
                    name: me.currentUser ? me.currentUser.userStore : me.defaultUserStoreName
                },
                success: function( response )
                {
                    var obj = Ext.decode( response.responseText, true );
                    if ( obj && obj.userFields )
                    {
                        me.generateForm( obj );
                    }
                    me.el.unmask();
                }
            } );
        }
    },

    initComponent: function()
    {
        this.userFieldSet = {
            'username': this.createTextField,
            'password': this.createPasswordField,
            'repeat-password': this.createPasswordField,
            'email': this.createTextField
        };
        this.nameFieldSet = {
            'display-name': this.createTextField,
            'prefix': this.createTextField,
            'first-name': this.createTextField,
            'middle-name': this.createTextField,
            'last-name': this.createTextField,
            'suffix': this.createTextField,
            'initials': this.createTextField,
            'nick-name': this.createTextField
        };
        this.photoFieldSet = {
            'photo': this.createPhotoField
        };
        this.detailsFieldSet = {
            'personal-id': this.createTextField,
            'member-id': this.createTextField,
            'organization': this.createTextField,
            'birthday': this.createDateField,
            'gender': this.createTextField,
            'title': this.createTextField,
            'description': this.createTextField,
            'html-email': this.createTextField,
            'homepage': this.createTextField
        };
        this.locationFieldSet = {
            'timezone': this.createComboBoxField,
            'locale': this.createComboBoxField,
            'country': this.createComboBoxField,
            'global-position': this.createTextField
        };
        this.communicationFieldSet = {
            'phone': this.createAutoCompleteField,
            'mobile': this.createAutoCompleteField,
            'fax': this.createAutoCompleteField
        };
        this.addressFieldSet = {
            'address': function(field)
            {
                var tabItem = me.generateAddressFieldSet(field);
                return {
                    sourceField: field,
                    xtype: 'tabpanel',
                    itemId: 'addressTabPanel',
                    height: 280,
                    width: 300,
                    items: [tabItem],
                    buttons: [
                        {
                            text: 'Add New Address',
                            action: 'addNewTab'
                        }
                    ]
                };
            }
        };
        this.callParent( arguments );
        this.removeAll();
        this.show();
    },

    createAutoCompleteField: function ( field )
    {
        var callingCodeStore = Ext.data.StoreManager.lookup( 'CallingCodeStore' );
        var f = {
            xtype: 'userFormField',
            type: 'autocomplete',
            fieldLabel: field.fieldlabel,
            fieldStore: callingCodeStore,
            valueField: 'callingCode',
            displayField: 'callingCode',
            displayConfig:{
                getInnerTpl: function()
                {
                    return '{callingCode} ({englishName})';
                }
            }
        };
        return f;
    },

    createComboBoxField: function ( field )
    {
        var fieldStore;
        var valueField;
        var displayField;
        if ( field.fieldname == 'timezone' )
        {
            fieldStore = Ext.data.StoreManager.lookup( 'TimezoneStore' );
            valueField = 'id';
            displayField = 'name';
        } else if ( field.fieldname == 'country' )
        {
            fieldStore = Ext.data.StoreManager.lookup( 'CountryStore' );
            valueField = 'code';
            displayField = 'englishName';
        } else if ( field.fieldname == 'region' )
        {
            fieldStore = new CMS.store.RegionStore();
            valueField = 'code';
            displayField = 'englishName';
        } else if ( field.fieldname == 'locale' )
        {
            fieldStore = Ext.data.StoreManager.lookup( 'LanguageStore' );
            valueField = 'languageCode';
            displayField = 'description';
        }

        return {
            xtype: 'userFormField',
            type: 'combo',
            queryMode: 'local',
            minChars: 1,
            emptyText: 'Please select',
            fieldStore: fieldStore,
            valueField: valueField,
            displayField: displayField
        };
    },

    createTextField: function( field )
    {
        return {
            xtype: 'userFormField',
            type: 'text'
        };
    },

    createPasswordField: function( field )
    {
        return {
            xtype: 'userFormField',
            type: 'password'
        };
    },

    createPhotoField: function( field )
    {
        return {
            xtype: 'userFormField',
            type: 'file'
        };
    },

    createDateField: function( field )
    {
        return {
            xtype: 'userFormField',
            type: 'date'
        };
    },

    generateForm: function(storeConfig)
    {
        if ( storeConfig && storeConfig.userFields )
        {
            var permanentFields = [
                {
                    label: 'Username',
                    type: 'username',
                    required: true,
                    remote: false,
                    readonly: false
                },
                {
                    label: 'Password',
                    type: 'password',
                    required: true,
                    remote: false,
                    readonly: false
                },
                {
                    label: 'Repeat password',
                    type: 'repeat-password',
                    required: true,
                    remote: false,
                    readonly: false
                },
                {
                    label: 'E-mail',
                    type: 'email',
                    required: true,
                    remote: false,
                    readonly: false
                }
            ];
            Ext.apply( storeConfig.userFields, permanentFields );
        }

        this.add( this.generateFieldSet( 'User', this.userFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Name', this.nameFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Photo', this.photoFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Personal Information', this.detailsFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Location', this.locationFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Communication', this.communicationFieldSet, storeConfig ) );
        this.add( this.generateFieldSet( 'Address', this.addressFieldSet, storeConfig ) );
    },

    generateFieldSet: function( title, fieldSet, storeConfig )
    {
        var fieldSetItem = {
            width: 300,
            defaults: {
                bodyPadding: 10
            },
            xtype: 'fieldset',
            title: title
        };
        var fieldItems = [];
        Ext.Array.each( storeConfig.userFields, function ( item )
        {
            if ( fieldSet[item.type] )
            {
                var baseConfig = {
                    fieldLabel: item.label || item.type,
                    fieldname: item.type,
                    required: item.required || false,
                    remote: item.remote || false,
                    readonly: item.readOnly || false
                };
                var createFunc = fieldSet[item.type];
                var newField = createFunc( item );
                newField = Ext.apply( newField, baseConfig );
                Ext.Array.include( fieldItems, newField )
            }
        }, this );
        if ( title == 'Address' )
        {
            return fieldItems;
        } else if ( fieldItems.length > 0 )
        {
            fieldSetItem.items = fieldItems;
            return fieldSetItem;
        }
        else
        {
            return [];
        }
    },

    generateAddressFieldSet: function ( field , closable)
    {
        var countryField, regionField;
        if ( field.iso )
        {
            var countryStore = Ext.data.StoreManager.lookup( 'CountryStore' );
            var regionStore = new CMS.store.RegionStore();
            var countryField = {
                xtype: 'combobox',
                store: countryStore,
                fieldLabel: 'Country',
                valueField: 'code',
                displayField: 'englishName',
                queryMode: 'local',
                minChars: 1,
                emptyText: 'Please select',
                name: 'address_country',
                itemId: 'address_country',
                disabled: field.readonly
            };
            var regionField = {
                xtype: 'combobox',
                store: regionStore,
                valueField: 'code',
                displayField: 'englishName',
                queryMode: 'local',
                minChars: 1,
                emptyText: 'Please select',
                fieldLabel: 'Region',
                name: 'address_region',
                itemId: 'address_region',
                disabled: true
            };
        }
        else
        {
            var countryField = {
                xtype: 'textfield',
                fieldLabel: 'Country',
                name: 'address_country',
                itemId: 'address_country',
                disabled: field.readonly
            };
            var regionField = {
                xtype: 'textfield',
                fieldLabel: 'Region',
                name: 'address_region',
                itemId: 'address_region',
                disabled: field.readonly
            };
        }
        var fieldSetItem = {
            measureWidth: true,
            measureHeight: true,
            defaults: {
                bodyPadding: 10
            },
            xtype: 'fieldset',
            title: 'Address',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Label',
                    name: 'address_label',
                    itemId: 'address_label',
                    enableKeyEvents: true,
                    bubbleEvents: ['keyup'],
                    disabled: field.readonly
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Street',
                    name: 'address_street',
                    itemId: 'address_street',
                    disabled: field.readonly
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Postal Code',
                    name: 'address_postal_code',
                    itemId: 'address_postal_code',
                    disabled: field.readonly
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Postal Address',
                    name: 'address_postal_address',
                    itemId: 'address_postal_address',
                    disabled: field.readonly
                },
                countryField,
                regionField
            ]
        };

        return {
            title: '[no title]',
            closable: closable || false,
            items: [fieldSetItem]
        };
    }

} );
