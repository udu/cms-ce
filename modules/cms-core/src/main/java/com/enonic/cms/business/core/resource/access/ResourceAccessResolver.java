/*
 * Copyright 2000-2011 Enonic AS
 * http://www.enonic.com/license
 */
package com.enonic.cms.business.core.resource.access;

import org.springframework.beans.factory.annotation.Autowired;

import com.enonic.cms.business.core.security.userstore.MemberOfResolver;

import com.enonic.cms.domain.resource.ResourceKey;
import com.enonic.cms.domain.security.user.UserEntity;

public class ResourceAccessResolver
{
    @Autowired
    private MemberOfResolver memberOfResolver;

    public boolean hasAccessToResourceTree( UserEntity executor )
    {
        return memberOfResolver.hasDeveloperPowers( executor );
    }

    public boolean hasAccess( ResourceKey resourceKey, UserEntity executor )
    {

        if ( resourceKey.isPublic() )
        {
            return true;
        }

        if ( memberOfResolver.hasDeveloperPowers( executor ) )
        {
            return true;
        }

        return false;
    }
}
