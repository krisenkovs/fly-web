<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "reset-password",
                realm: "${realm.name}",
                message: {
                    type: "",
                    text: ""
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "",
                    action: "${url.loginAction}".replace(/amp;/g, ''),
                    resource: "${url.resourcesPath}".replace(/amp;/g, ''),
                    base: ""
                },
                fields: {
                    username: "${username}"
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