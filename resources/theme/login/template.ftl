<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <#if properties.styles?has_content>
            <#list properties.styles?split(' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet"/>
            </#list>
        </#if>
        <style>
              html,
              body {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                font-family: Mulish, sans-serif;
                font-size: 14px;
                overflow: hidden;
              }

              body {
                display: flex;
                flex-direction: column;
                align-items: center;

                --color-blue: #005eeb;
                --color-black: #2c2e31;
                --color-white: #ffffff;
                --color-pale-blue: #eef5ff;
                --color-light-blue: #d2e4ff;
                --color-light-black: #656a71;
                --color-grey: #c2cddb;
                --color-additional-grey: #f0f0f0;
                --color-green: #3bc561;
                --color-red: #f44c4c;
              }

              #root {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                background: var(--color-white);
                flex: 1;
                max-width: 1024px;
              }

              /* Chrome, Safari, Edge, Opera */
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }

              /* Firefox */
              input[type='number'] {
                -moz-appearance: textfield;
              }
            </style>
        <title>BatteryFly</title>
    </head>
    <body>
    <#nested "header">
    <div id="root">
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: column;
              flex: 1;
              align-content: center;
              justify-content: center;
              background: var(--color-blue);
            "
          >
            <svg
              width="181"
              height="204"
              viewBox="0 0 181 204"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="align-self: center"
            >
              <path
                d="M180.097 43.4862C180.097 19.4695 160.596 0 136.579 0C112.528 0 92.9999 19.4973 92.9999 43.5484V86.9725H136.61C160.627 86.9725 180.097 67.503 180.097 43.4862Z"
                fill="white"
              />
              <path
                d="M21.7742 125.385C21.7742 143.398 36.3995 158 54.4121 158C72.4505 158 87.0968 143.377 87.0968 125.339L87.0968 92.7706L54.3888 92.7706C36.3763 92.7706 21.7742 107.373 21.7742 125.385Z"
                fill="white"
              />
              <path
                d="M0 43.4862C0 19.4694 19.5005 -8.29434e-06 43.5173 -8.29434e-06C67.5684 -8.29434e-06 87.0968 19.4973 87.0968 43.5484V67.7661L72.5806 86.9725H43.4862C19.4694 86.9725 0 67.503 0 43.4862Z"
                fill="white"
              />
              <path
                d="M158.226 125.385C158.226 143.398 143.6 158 125.588 158C107.55 158 92.9033 143.377 92.9033 125.339L92.9033 114.876L109.234 92.7706L125.611 92.7706C143.624 92.7706 158.226 107.373 158.226 125.385Z"
                fill="white"
              />
              <path
                d="M25.7068 189.419V195.047C25.7068 195.19 25.7874 195.28 25.9486 195.315C26.5753 195.405 27.1663 195.449 27.7214 195.449C29.2077 195.449 30.2911 195.181 30.9716 194.645C31.67 194.091 32.0192 193.252 32.0192 192.126C32.0192 191.125 31.6163 190.392 30.8104 189.928C30.0225 189.445 28.7063 189.204 26.8619 189.204H25.9217C25.7785 189.204 25.7068 189.276 25.7068 189.419ZM25.7068 181.592V186.175C25.7068 186.336 25.7785 186.416 25.9217 186.416H26.7007C28.3661 186.416 29.5659 186.193 30.3001 185.746C31.0522 185.282 31.4283 184.603 31.4283 183.709C31.4283 182.852 31.1238 182.217 30.515 181.806C29.9061 181.395 28.9123 181.19 27.5334 181.19C26.9066 181.19 26.3694 181.225 25.9217 181.297C25.7785 181.333 25.7068 181.431 25.7068 181.592ZM23.5042 198.157C23.0744 198.121 22.7163 197.942 22.4298 197.621C22.1433 197.281 22 196.888 22 196.441V180.198C22 179.751 22.1433 179.367 22.4298 179.045C22.7163 178.706 23.0834 178.518 23.5311 178.482C24.8562 178.34 26.1366 178.268 27.3722 178.268C32.3863 178.268 34.8933 179.903 34.8933 183.173C34.8933 184.263 34.5262 185.21 33.792 186.014C33.0578 186.819 32.0908 187.337 30.891 187.569C30.8731 187.569 30.8642 187.578 30.8642 187.596C30.8642 187.632 30.8731 187.649 30.891 187.649C32.3594 187.864 33.5055 188.409 34.3293 189.285C35.1709 190.142 35.5917 191.205 35.5917 192.474C35.5917 194.44 34.9471 195.914 33.6577 196.897C32.3684 197.88 30.3628 198.371 27.6408 198.371C26.2799 198.371 24.901 198.3 23.5042 198.157Z"
                fill="white"
              />
              <path
                d="M44.9432 191.402C42.3824 191.402 41.102 192.188 41.102 193.761C41.102 194.333 41.2632 194.797 41.5855 195.155C41.9258 195.512 42.3555 195.691 42.8749 195.691C43.8956 195.691 44.7193 195.378 45.3461 194.753C45.9728 194.109 46.2862 193.234 46.2862 192.126V191.643C46.2862 191.482 46.2056 191.402 46.0445 191.402H44.9432ZM41.9079 198.371C40.6902 198.371 39.6784 197.978 38.8726 197.192C38.0846 196.388 37.6907 195.351 37.6907 194.082C37.6907 192.528 38.2816 191.322 39.4635 190.464C40.6633 189.606 42.4899 189.177 44.9432 189.177H46.0445C46.2056 189.177 46.2862 189.097 46.2862 188.936V188.722C46.2862 187.9 46.0892 187.328 45.6953 187.006C45.3013 186.667 44.6029 186.497 43.6001 186.497C42.5615 186.497 41.2901 186.685 39.7858 187.06C39.4635 187.149 39.168 187.096 38.8994 186.899C38.6308 186.685 38.4965 186.408 38.4965 186.068C38.4965 185.657 38.6219 185.291 38.8726 184.969C39.1233 184.63 39.4456 184.424 39.8396 184.353C41.2005 184.049 42.4809 183.897 43.6807 183.897C45.9728 183.897 47.5756 184.308 48.4888 185.13C49.4021 185.952 49.8588 187.39 49.8588 189.445V196.575C49.8588 196.986 49.7065 197.344 49.4021 197.647C49.1156 197.951 48.7664 198.103 48.3545 198.103H48.0591C47.6293 198.103 47.2622 197.96 46.9578 197.674C46.6533 197.37 46.4922 197.004 46.4743 196.575V196.2C46.4743 196.182 46.4653 196.173 46.4474 196.173C46.4116 196.173 46.3937 196.182 46.3937 196.2C45.3013 197.647 43.806 198.371 41.9079 198.371Z"
                fill="white"
              />
              <path
                d="M53.2237 187.301C52.8656 187.301 52.5612 187.176 52.3105 186.926C52.0598 186.658 51.9344 186.345 51.9344 185.988C51.9344 185.63 52.0598 185.326 52.3105 185.076C52.5612 184.826 52.8656 184.701 53.2237 184.701H54.5131C54.6742 184.701 54.7548 184.621 54.7548 184.46V181.136C54.7548 180.725 54.8981 180.368 55.1846 180.064C55.489 179.76 55.8472 179.608 56.259 179.608H56.7963C57.2081 179.608 57.5663 179.76 57.8707 180.064C58.1751 180.368 58.3274 180.725 58.3274 181.136V184.46C58.3274 184.621 58.4079 184.701 58.5691 184.701H61.6313C61.9894 184.701 62.2938 184.826 62.5445 185.076C62.8132 185.326 62.9475 185.63 62.9475 185.988C62.9475 186.345 62.8132 186.658 62.5445 186.926C62.2938 187.176 61.9894 187.301 61.6313 187.301H58.5691C58.4079 187.301 58.3274 187.373 58.3274 187.515V192.93C58.3274 194.091 58.4527 194.842 58.7034 195.181C58.9541 195.521 59.4734 195.691 60.2613 195.691C60.6911 195.691 61.0135 195.673 61.2284 195.637C61.5865 195.601 61.8999 195.682 62.1685 195.878C62.4371 196.075 62.5714 196.343 62.5714 196.682C62.5714 197.076 62.4371 197.433 62.1685 197.755C61.9178 198.058 61.6044 198.228 61.2284 198.264C60.4404 198.335 59.8495 198.371 59.4555 198.371C57.7185 198.371 56.5008 198.005 55.8024 197.272C55.104 196.522 54.7548 195.19 54.7548 193.278V187.515C54.7548 187.373 54.6742 187.301 54.5131 187.301H53.2237Z"
                fill="white"
              />
              <path
                d="M66.7592 187.301C66.4011 187.301 66.0966 187.176 65.8459 186.926C65.5952 186.658 65.4699 186.345 65.4699 185.988C65.4699 185.63 65.5952 185.326 65.8459 185.076C66.0966 184.826 66.4011 184.701 66.7592 184.701H68.0486C68.2097 184.701 68.2903 184.621 68.2903 184.46V181.136C68.2903 180.725 68.4336 180.368 68.7201 180.064C69.0245 179.76 69.3827 179.608 69.7945 179.608H70.3317C70.7436 179.608 71.1018 179.76 71.4062 180.064C71.7106 180.368 71.8628 180.725 71.8628 181.136V184.46C71.8628 184.621 71.9434 184.701 72.1046 184.701H75.1668C75.5249 184.701 75.8293 184.826 76.08 185.076C76.3486 185.326 76.4829 185.63 76.4829 185.988C76.4829 186.345 76.3486 186.658 76.08 186.926C75.8293 187.176 75.5249 187.301 75.1668 187.301H72.1046C71.9434 187.301 71.8628 187.373 71.8628 187.515V192.93C71.8628 194.091 71.9882 194.842 72.2389 195.181C72.4896 195.521 73.0089 195.691 73.7968 195.691C74.2266 195.691 74.5489 195.673 74.7638 195.637C75.122 195.601 75.4354 195.682 75.704 195.878C75.9726 196.075 76.1069 196.343 76.1069 196.682C76.1069 197.076 75.9726 197.433 75.704 197.755C75.4533 198.058 75.1399 198.228 74.7638 198.264C73.9759 198.335 73.385 198.371 72.991 198.371C71.254 198.371 70.0363 198.005 69.3379 197.272C68.6395 196.522 68.2903 195.19 68.2903 193.278V187.515C68.2903 187.373 68.2097 187.301 68.0486 187.301H66.7592Z"
                fill="white"
              />
              <path
                d="M85.6338 186.39C84.7205 186.39 84.0131 186.649 83.5117 187.167C83.0282 187.667 82.7238 188.48 82.5985 189.606C82.5985 189.749 82.6701 189.821 82.8134 189.821H88.0781C88.2214 189.821 88.293 189.749 88.293 189.606C88.2214 187.462 87.335 186.39 85.6338 186.39ZM86.3053 198.371C83.9594 198.371 82.1508 197.764 80.8794 196.548C79.6258 195.315 78.9991 193.511 78.9991 191.134C78.9991 188.775 79.5632 186.979 80.6913 185.746C81.8195 184.513 83.4491 183.897 85.58 183.897C89.5555 183.897 91.5969 186.148 91.7044 190.652C91.7223 191.08 91.5701 191.438 91.2477 191.724C90.9254 192.01 90.5494 192.153 90.1196 192.153H82.7865C82.6253 192.153 82.5627 192.233 82.5985 192.394C82.7238 193.591 83.1178 194.467 83.7804 195.021C84.4608 195.557 85.4457 195.825 86.7351 195.825C87.5409 195.825 88.4363 195.691 89.4212 195.423C89.7435 195.333 90.039 195.387 90.3076 195.584C90.5941 195.78 90.7374 196.048 90.7374 196.388C90.7374 196.799 90.612 197.165 90.3613 197.487C90.1285 197.79 89.8152 197.978 89.4212 198.049C88.4184 198.264 87.3797 198.371 86.3053 198.371Z"
                fill="white"
              />
              <path
                d="M96.1337 198.103C95.7219 198.103 95.3637 197.951 95.0593 197.647C94.7549 197.344 94.6026 196.986 94.6026 196.575V185.693C94.6026 185.282 94.7549 184.924 95.0593 184.621C95.3637 184.317 95.7219 184.165 96.1337 184.165H96.671C97.0828 184.165 97.441 184.317 97.7454 184.621C98.0498 184.924 98.202 185.282 98.202 185.693V186.819C98.202 186.836 98.211 186.845 98.2289 186.845C98.2647 186.845 98.2826 186.836 98.2826 186.819C98.8019 186.104 99.4824 185.523 100.324 185.076C101.166 184.612 102.088 184.326 103.091 184.219C103.467 184.183 103.789 184.308 104.058 184.594C104.326 184.862 104.461 185.184 104.461 185.559C104.461 185.934 104.326 186.256 104.058 186.524C103.789 186.792 103.467 186.944 103.091 186.979C99.9212 187.23 98.3363 188.838 98.3363 191.804V196.575C98.3363 196.986 98.1841 197.344 97.8797 197.647C97.5753 197.951 97.2171 198.103 96.8053 198.103H96.1337Z"
                fill="white"
              />
              <path
                d="M111.239 197.889L106.78 185.586C106.673 185.228 106.718 184.907 106.914 184.621C107.111 184.317 107.398 184.165 107.774 184.165H108.58C109.028 184.165 109.439 184.308 109.815 184.594C110.192 184.862 110.433 185.21 110.541 185.639L113.039 194.404C113.039 194.422 113.048 194.431 113.066 194.431C113.084 194.431 113.093 194.422 113.093 194.404L115.967 185.612C116.11 185.184 116.37 184.835 116.746 184.567C117.122 184.299 117.534 184.165 117.981 184.165H118.626C119.002 184.165 119.288 184.317 119.485 184.621C119.7 184.924 119.736 185.246 119.593 185.586L113.039 202.579C112.878 203.008 112.609 203.348 112.233 203.598C111.857 203.866 111.436 204 110.971 204H110.326C109.968 204 109.681 203.848 109.466 203.544C109.269 203.258 109.242 202.946 109.386 202.606L111.239 198.318C111.275 198.246 111.293 198.175 111.293 198.103C111.293 198.032 111.275 197.96 111.239 197.889Z"
                fill="white"
              />
              <path
                d="M123.919 198.103C123.507 198.103 123.149 197.951 122.844 197.647C122.558 197.344 122.414 196.986 122.414 196.575V180.064C122.414 179.653 122.558 179.296 122.844 178.992C123.149 178.688 123.507 178.536 123.919 178.536H132.783C133.195 178.536 133.553 178.688 133.857 178.992C134.162 179.296 134.314 179.653 134.314 180.064C134.314 180.475 134.162 180.832 133.857 181.136C133.553 181.422 133.195 181.565 132.783 181.565H126.39C126.247 181.565 126.175 181.645 126.175 181.806V186.497C126.175 186.64 126.247 186.711 126.39 186.711H132.326C132.72 186.711 133.06 186.854 133.347 187.14C133.633 187.408 133.777 187.748 133.777 188.159C133.777 188.57 133.633 188.918 133.347 189.204C133.06 189.472 132.72 189.606 132.326 189.606H126.39C126.247 189.606 126.175 189.678 126.175 189.821V196.575C126.175 196.986 126.023 197.344 125.718 197.647C125.414 197.951 125.056 198.103 124.644 198.103H123.919Z"
                fill="white"
              />
              <path
                d="M140.222 198.103C139.81 198.103 139.452 197.951 139.147 197.647C138.843 197.344 138.691 196.986 138.691 196.575V179.528C138.691 179.117 138.843 178.759 139.147 178.456C139.452 178.152 139.81 178 140.222 178H140.92C141.332 178 141.69 178.152 141.994 178.456C142.299 178.759 142.451 179.117 142.451 179.528V196.575C142.451 196.986 142.299 197.344 141.994 197.647C141.69 197.951 141.332 198.103 140.92 198.103H140.222Z"
                fill="white"
              />
              <path
                d="M150.56 197.889L146.101 185.586C145.994 185.228 146.039 184.907 146.236 184.621C146.433 184.317 146.719 184.165 147.095 184.165H147.901C148.349 184.165 148.761 184.308 149.137 184.594C149.513 184.862 149.754 185.21 149.862 185.639L152.36 194.404C152.36 194.422 152.369 194.431 152.387 194.431C152.405 194.431 152.414 194.422 152.414 194.404L155.288 185.612C155.431 185.184 155.691 184.835 156.067 184.567C156.443 184.299 156.855 184.165 157.302 184.165H157.947C158.323 184.165 158.61 184.317 158.807 184.621C159.021 184.924 159.057 185.246 158.914 185.586L152.36 202.579C152.199 203.008 151.93 203.348 151.554 203.598C151.178 203.866 150.757 204 150.292 204H149.647C149.289 204 149.002 203.848 148.787 203.544C148.59 203.258 148.564 202.946 148.707 202.606L150.56 198.318C150.596 198.246 150.614 198.175 150.614 198.103C150.614 198.032 150.596 197.96 150.56 197.889Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

    </div>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script defer src="${url.resourcesPath}/${script}"></script>
        </#list>
    </#if>
    </body>
    </html>
</#macro>
