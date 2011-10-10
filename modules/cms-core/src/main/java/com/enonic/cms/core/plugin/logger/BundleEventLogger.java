package com.enonic.cms.core.plugin.logger;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleEvent;
import org.osgi.framework.BundleListener;

import com.enonic.cms.api.util.LogFacade;

final class BundleEventLogger
    implements BundleListener
{
    private final static LogFacade LOG = LogFacade.get( BundleEventLogger.class );

    public void bundleChanged( final BundleEvent event )
    {
        final Bundle bundle = event.getBundle();

        switch ( event.getType() )
        {
            case BundleEvent.INSTALLED:
                LOG.info( "Installed plugin [{0}] from [{1}]", bundle.getSymbolicName(), bundle.getLocation() );
                break;
            case BundleEvent.UNINSTALLED:
                LOG.info( "Uninstalled plugin [{0}] from [{1}]", bundle.getSymbolicName(), bundle.getLocation() );
                break;
            case BundleEvent.STARTED:
                LOG.info( "Started plugin [{0}]", bundle.getSymbolicName() );
                break;
        }
    }
}
