<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "register",
                realm: "${realm.name}",
                message: {
                    type: "",
                    text: ""
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "${url.loginUrl}".replace(/amp;/g, ''),
                    social: {},
                    action: "${url.registrationAction}".replace(/amp;/g, ''),
                    resource: "${url.resourcesPath}".replace(/amp;/g, '')
                },
                fields: {
                    firstName: "${(register.formData.firstName!'')}",
                    lastName: "${(register.formData.lastName!'')}",
                    username: "${(register.formData.username!'')}"
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
            <#if realm.resetPasswordAllowed>
            theme.url.resetPassword = "${url.loginResetCredentialsUrl}".replace(/amp;/g, '');
            </#if>
            window.theme = theme;
        </script>
    </#if>
</@layout.registrationLayout>
