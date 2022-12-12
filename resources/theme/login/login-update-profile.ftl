<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "update-profile",
                realm: "${realm.name}",
                message: {
                    type: "",
                    text: ""
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "${url.loginUrl}".replace(/amp;/g, '').replace(/&tab_id.*$/, ''),
                    social: {},
                    action: "${url.loginAction}".replace(/amp;/g, ''),
                    resource: "${url.resourcesPath}".replace(/amp;/g, ''),
                    base: "${client.baseUrl}".replace(/amp;/g, '')
                },
                fields: {
                    email: "${(user.email!'')}",
                    firstName: "${(user.firstName!'')}",
                    lastName: "${(user.lastName!'')}",
                },
                fieldsError: {}

            };
            <#if message?has_content>
            theme.message.text = '${message.summary}';
            theme.message.type = '${message.type}';
            </#if>

            window.theme = theme;

        </script>
    </#if>
</@layout.registrationLayout>
