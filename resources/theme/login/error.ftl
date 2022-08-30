<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "error",
                realm: "${realm.name}",
                message: {
                    type: "",
                    text: "${message.summary}"
                },
                url: {
                    registration: "",
                    resetPassword: "",
                    login: "",
                    social: {},
                    action: "",
                    resource: "${url.resourcesPath}".replace(/amp;/g, ''),
                    base: ""
                },
                fields: {},
                fieldsError: {}
            };
            <#if client?? && client.baseUrl?has_content>
            theme.url.action = "${client.baseUrl}".replace(/amp;/g, '')+"/deepLink/home";
            </#if>

            window.theme = theme;
        </script>
    </#if>
</@layout.registrationLayout>