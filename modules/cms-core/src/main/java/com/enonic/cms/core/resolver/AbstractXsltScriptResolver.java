/*
 * Copyright 2000-2011 Enonic AS
 * http://www.enonic.com/license
 */
package com.enonic.cms.core.resolver;

import javax.inject.Inject;
import javax.xml.transform.URIResolver;

import org.jdom.Document;
import org.jdom.transform.JDOMSource;

import com.enonic.esl.util.RegexpUtil;

import com.enonic.cms.core.resolver.locale.LocaleResolverException;
import com.enonic.cms.core.resource.ResourceFile;
import com.enonic.cms.core.xslt.XsltProcessor;
import com.enonic.cms.core.xslt.XsltProcessorException;
import com.enonic.cms.core.xslt.XsltProcessorManager;
import com.enonic.cms.core.xslt.XsltProcessorManagerAccessor;

/**
 * Created by rmy - Date: Apr 29, 2009
 */
public abstract class AbstractXsltScriptResolver
    implements ScriptResolverService
{
    protected final static String RESOLVING_EXCEPTION_MSG = "Failed to resolve value";

    private static final String XSLT_RESOLVER_PROCESSOR_NAME = "xsltResolverProcessor";

    private ResolverInputXMLCreator resolverInputXMLCreator;

    public ScriptResolverResult resolveValue( ResolverContext context, ResourceFile localeResolverScript )
    {
        Document resolverInput = getResolverInput( context );

        String resolvedValue;
        try
        {
            resolvedValue = resolveWithXsltScript( localeResolverScript.getDataAsXml(), resolverInput );
        }
        catch ( XsltProcessorException e )
        {
            throw new LocaleResolverException( RESOLVING_EXCEPTION_MSG + " using script : " + localeResolverScript.getPath(), e );
        }

        return populateScriptResolverResult( resolvedValue );
    }

    protected abstract ScriptResolverResult populateScriptResolverResult( String resolvedValue );

    protected XsltProcessor createProcessor( String name, Document xslt, URIResolver uriResolver )
        throws XsltProcessorException
    {
        final JDOMSource source = new JDOMSource( xslt );
        source.setSystemId(name);

        final XsltProcessorManager manager = XsltProcessorManagerAccessor.getProcessorManager();
        final XsltProcessor processor = manager.createProcessor( source, uriResolver );
        processor.setOmitXmlDecl( true );
        
        return processor;
    }

    protected String cleanWhitespaces( String value )
    {
        value = RegexpUtil.substituteAll( "(\\n)", "", value );
        value = RegexpUtil.substituteAll( "(\\t)", "", value );
        value = RegexpUtil.substituteAll( "(\\s)", "", value );
        return value;
    }

    protected String resolveWithXsltScript( Document xslt, Document document )
        throws XsltProcessorException
    {
        URIResolver uriResolver = null;
        XsltProcessor processor = createProcessor( XSLT_RESOLVER_PROCESSOR_NAME, xslt, uriResolver );

        String result = processor.process( new JDOMSource( document ) );
        return cleanWhitespaces( result );
    }

    protected Document getResolverInput( ResolverContext context )
    {
        return resolverInputXMLCreator.buildResolverInputXML( context );
    }

    @Inject
    public void setResolverInputXMLCreator( ResolverInputXMLCreator resolverInputXMLCreator )
    {
        this.resolverInputXMLCreator = resolverInputXMLCreator;
    }
}

