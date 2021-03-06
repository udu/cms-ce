/*
 * Copyright 2000-2011 Enonic AS
 * http://www.enonic.com/license
 */
package com.enonic.cms.business.login;

import com.enonic.cms.domain.SiteKey;
import com.enonic.cms.domain.security.user.UserKey;

/**
 * Jul 10, 2009
 */
public interface LoginService
{
    String rememberLogin( UserKey userKey, SiteKey siteKey, boolean resetGUID );

    UserKey getRememberedLogin( String guid, SiteKey sitekey );

}
