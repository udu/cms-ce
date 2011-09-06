/*
 * Copyright 2000-2011 Enonic AS
 * http://www.enonic.com/license
 */
package com.enonic.cms.domain.content.contentdata.custom.stringbased;

import org.junit.Test;

import com.enonic.cms.domain.content.contenttype.dataentryconfig.DataEntryConfig;
import com.enonic.cms.domain.content.contenttype.dataentryconfig.TextDataEntryConfig;

import static org.junit.Assert.*;


public class SelectorDataEntryTest
{
    @Test
    public void value_is_stripped_for_any_newlines()
    {
        DataEntryConfig config = new TextDataEntryConfig( "test", true, "Test", "contentdata/test" );
        SelectorDataEntry entry = new SelectorDataEntry( config, "\r\nCarriageReturn\r\nNewline\r\n" );
        assertEquals( "CarriageReturnNewline", entry.getValue() );
    }

    @Test
    public void value_is_stripped_for_any_carriage_returns()
    {
        DataEntryConfig config = new TextDataEntryConfig( "test", true, "Test", "contentdata/test" );
        SelectorDataEntry entry = new SelectorDataEntry( config, "\rCarriage\rReturn\r" );
        assertEquals( "CarriageReturn", entry.getValue() );
    }

    @Test
    public void value_is_stripped_for_any_formfeed()
    {
        DataEntryConfig config = new TextDataEntryConfig( "test", true, "Test", "contentdata/test" );
        SelectorDataEntry entry = new SelectorDataEntry( config, "\fForm\fFeed\f" );
        assertEquals( "FormFeed", entry.getValue() );
    }

    @Test
    public void value_is_stripped_for_any_tab()
    {
        DataEntryConfig config = new TextDataEntryConfig( "test", true, "Test", "contentdata/test" );
        SelectorDataEntry entry = new SelectorDataEntry( config, "\tTab\tTab\t" );
        assertEquals( "TabTab", entry.getValue() );
    }

}
