package com.enonic.cms.admin.group;

import java.util.List;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sun.jersey.api.NotFoundException;

import com.enonic.cms.core.security.group.GroupEntity;
import com.enonic.cms.core.security.user.UserEntity;
import com.enonic.cms.store.dao.GroupDao;
import com.enonic.cms.store.dao.UserDao;

@Component
@Path("/admin/data/group")
@Produces("application/json")
public final class GroupResource
{

    @Autowired
    private GroupDao groupDao;

    @Autowired
    private UserDao userDao;


    @POST
    @Path("join")
    public void join( @FormParam("key") @DefaultValue("") final String key,
                      @FormParam("isUser") @DefaultValue("false") final boolean isUser,
                      @FormParam("join") final List<String> join )
    {

        GroupEntity groupToAddTo = null;
        if ( isUser )
        {
            UserEntity user = userDao.findByKey( key );
            if ( user != null )
            {
                groupToAddTo = user.getUserGroup();
            }
        }
        else
        {
            groupToAddTo = groupDao.find( key );
        }

        if ( groupToAddTo != null )
        {
            GroupEntity groupToAdd;
            for ( String s : join )
            {
                groupToAdd = groupDao.find( s );
                if ( groupToAdd != null && !groupToAdd.hasMembership( groupToAddTo ) )
                {
                    groupToAdd.addMembership( groupToAddTo );
                }
            }
        }
        //TODO: Add update user group code
    }


    @POST
    @Path("leave")
    public void leave( @FormParam("key") @DefaultValue("") final String key,
                       @FormParam("isUser") @DefaultValue("false") final boolean isUser,
                       @FormParam("leave") final List<String> leave )
    {

        GroupEntity groupToRemoveFrom = null;
        if ( isUser )
        {
            UserEntity user = userDao.findByKey( key );
            if ( user != null )
            {
                groupToRemoveFrom = user.getUserGroup();
            }
        }
        else
        {
            groupToRemoveFrom = groupDao.find( key );
        }

        if ( groupToRemoveFrom != null )
        {
            GroupEntity groupToRemove;
            for ( String s : leave )
            {
                groupToRemove = groupDao.find( s );
                if ( groupToRemove != null && groupToRemove.hasMembership( groupToRemoveFrom ) )
                {
                    groupToRemove.removeMembership( groupToRemoveFrom );
                }
            }
        }
        //TODO: Add update user group code
    }


    @POST
    @Path("delete")
    public void delete( @FormParam("key") @DefaultValue("") final String key )
    {
        GroupEntity group = groupDao.find( key );
        if ( group != null )
        {
            groupDao.delete( group );
        }
    }

    @GET
    @Path("detail")
    public GroupModel getGroupDetails(@QueryParam("key") final String key)
    {
        final GroupEntity entity = findEntity( key );

        return GroupModelHelper.toAModel( entity );
    }

    private GroupEntity findEntity( final String key )
    {
        if ( key == null )
        {
            throw new NotFoundException();
        }

        final GroupEntity entity = this.groupDao.find( key );
        if ( entity == null )
        {
            throw new NotFoundException();
        }

        return entity;
    }

}
