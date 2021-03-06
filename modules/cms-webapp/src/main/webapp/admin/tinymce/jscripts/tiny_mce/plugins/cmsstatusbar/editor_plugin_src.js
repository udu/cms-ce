(function()
{
    // tinymce.PluginManager.requireLangPack('tableextras');

    tinymce.create('tinymce.plugins.CMSStatusBarPlugin', {

        init : function(ed, url)
        {

            ed.onPostRender.add(function(ed, cm)
            {

                var sId = ed.id;
                var oPathRow = document.getElementById(sId + '_path_row');
                var oStatusBar = oPathRow.parentNode;

                oPathRow.style.padding = '3px 0 0 0';
                oStatusBar.style.height = '26px';

                var sButtons = '';

                if (ed.settings.accessToHtmlSource) {
                    sButtons += '<a class="mceButton mceButtonEnabled cms_code" title="' + ed.getLang('advanced.code_desc') + '" ' +
                               'onclick="javascript:tinyMCE.get(\'' + sId + '\').execCommand(\'mceCodeEditor\',false); return false;" ' +
                               'onmousedown="return false;" href="javascript:;" ' +
                               'style="float:left"><span class="mceIcon cms_code"></span></a>';
                }

                sButtons += '<a class="mceButton mceButtonEnabled mce_fullscreen" ' +
                         'title="' + ed.getLang('fullscreen.desc') +  '" onclick="javascript:tinyMCE.get(\'' + sId + '\').execCommand(\'mceFullScreen\',false); return false;" ' +
                         'href="javascript:;" style="float:left"><span class="mceIcon mce_fullscreen"></span></a><span class="mceSeparator" style="float:left"></span>';

                var oButtonWrapper = document.createElement('div');
                oButtonWrapper.id = sId + '_cms_button_wrapper';
                oButtonWrapper.style.cssFloat = 'left';

                oButtonWrapper.innerHTML = sButtons;

                oStatusBar.insertBefore(oButtonWrapper, oPathRow);
            });
        },
        // ---------------------------------------------------------------------

        getInfo : function()
        {
            return {
                longname : 'CMS Status Bar',
                author : 'tan@enonic.com',
                authorurl : 'http://www.enonic.com',
                infourl : 'http://www.enonic.com',
                version : '1.0'
            };
        }
    });

    tinymce.PluginManager.add('cmsstatusbar', tinymce.plugins.CMSStatusBarPlugin);
})();