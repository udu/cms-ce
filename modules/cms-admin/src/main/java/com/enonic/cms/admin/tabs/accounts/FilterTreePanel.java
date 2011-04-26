/*
 * Copyright 2000-2011 Enonic AS
 * http://www.enonic.com/license
 */
package com.enonic.cms.admin.tabs.accounts;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.vaadin.event.FieldEvents;
import com.vaadin.ui.CheckBox;
import com.vaadin.ui.Label;
import com.vaadin.ui.TextField;
import com.vaadin.ui.VerticalLayout;

import com.enonic.cms.core.security.group.GroupStorageService;
import com.enonic.cms.core.security.user.User;
import com.enonic.cms.core.service.UserServicesService;


@Component
@Scope("prototype")
public class FilterTreePanel
        extends VerticalLayout
{
    @Autowired
    private TablePanel tablePanel;

    @Autowired @Transient
    private UserServicesService userServicesService;

    @Autowired @Transient
    private GroupStorageService groupStorageService;

    @PostConstruct
    private void init()
    {
        setStyleName( "accounts-spacer" );
        setMargin( true );

        VerticalLayout column = new VerticalLayout();

        final TextField search = new TextField();
        search.setWidth( "162px" );
        search.setInputPrompt( "search" );
        search.setStyleName( "accounts-search-text" );

        // init table
        List<User> users = userServicesService.findAll();
        tablePanel.showUsers(users);

        search.addListener( new FieldEvents.TextChangeListener() {
            public void textChange( FieldEvents.TextChangeEvent event ) {
                List<User> users = userServicesService.findByCriteria( event.getText(), User.NAME_PROPERTY, true );
                tablePanel.showUsers(users);
            }
        });

        column.addComponent( search );

        column.addComponent( createBoldLabel( "Type" ) );
        // Users
        Long count = userServicesService.count();
        String present = String.format("Users (%s)", count);
        column.addComponent( createCheckBox( present ) );

        // Groups
        count = groupStorageService.count();
        present = String.format("Groups (%s)", count);
        column.addComponent( createCheckBox( present ) );

        column.addComponent( createBoldLabel( "Userstores" ) );
        column.addComponent( createCheckBox( "AD (10)" ) );
        column.addComponent( createCheckBox( "Community (134)" ) );
        column.addComponent( createCheckBox( "LDAP2 (43)" ) );

        addComponent( column );
    }


    private Label createBoldLabel( String name )
    {
        Label label = new Label( name );
        label.setStyleName( "accounts-check-title" );
        return label;
    }

    private CheckBox createCheckBox( String title )
    {
        CheckBox checkBox = new CheckBox( title );
        checkBox.setStyleName( "accounts-check-filter" );
        return checkBox;
    }
}
