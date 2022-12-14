<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "login",
                realm: "${realm.name}",
                message: {
                    type: "",
                    text: ""
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "",
                    social: {},
                    action: "${url.loginAction}".replace(/amp;/g, ''),
                    resource: "${url.resourcesPath}".replace(/amp;/g, '')
                },
                fields: {
                    username: "${(login.username!'')}"
                },
                fieldsError: {}
            };
            <#if social.providers??>
               <#list social.providers as p>
                   theme.url.social['${p.displayName!}'] = "${p.loginUrl}".replace(/amp;/g, '');
               </#list>
            </#if>

            <#if message?has_content>
            theme.message.text = '${message.summary}';
            theme.message.type = '${message.type}';
            </#if>
            <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            theme.url.registration = "${url.registrationUrl}".replace(/amp;/g, '');
            </#if>
            <#if realm.resetPasswordAllowed>
            theme.url.resetPassword = "${url.loginResetCredentialsUrl}".replace(/amp;/g, '');
            </#if>

            window.theme = theme;

        </script>
    </#if>
</@layout.registrationLayout>
