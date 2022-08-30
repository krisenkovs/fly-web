<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <script type="text/javascript">
            var theme = {
                page: "info",
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
                    action: "",
                    resource: "${url.resourcesPath}".replace(/amp;/g, ''),
                    base: "${client.baseUrl}".replace(/amp;/g, '')
                },
                fields: {},
                fieldsError: {}
            };
            <#if message?has_content>
            theme.message.text = '${message.summary}';
            theme.message.type = '${message.type}';
            </#if>
            <#if pageRedirectUri?has_content>
            theme.url.action = "${pageRedirectUri}".replace(/amp;/g, '');
            theme.actionCode = "Go to Main page";
            <#elseif actionUri?has_content>
            theme.url.action = "${actionUri}".replace(/amp;/g, '');
            theme.actionCode = "Click here to proceed";
            <#elseif (client.baseUrl)?has_content>
            theme.url.action = "${client.baseUrl}".replace(/amp;/g, '')+"/deepLink/home";
            theme.actionCode = "Go to Main page";
            </#if>

            window.theme = theme;

        </script>
    </#if>
</@layout.registrationLayout>