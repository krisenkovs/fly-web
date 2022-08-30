<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "login-page-expired",
                realm: "${realm.name}",
                message: {
                    type: "error",
                    text: "Activation link has expired "
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "",
                    action: "${client.baseUrl}".replace(/amp;/g, ''),
                    resource: "${url.resourcesPath}".replace(/amp;/g, ''),
                    base: "${client.baseUrl}".replace(/amp;/g, '')
                },
                fields: {},
                fieldsError: {},
                actionCode: "Go to Main page",
            };

            window.theme = theme;

        </script>
    </#if>
</@layout.registrationLayout>
