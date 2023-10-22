---
type: post
category: fe
---
Web UI Security matters
Read 51 penetration test and Front-End-Checklist first.

1. Reverse tab nabbing
CRITICALITY:

An attacker might use this technique to silently load other pages on the parent tab which can be used for malicious operations such as phishing attacks.

SUGGESTED FIX:

Please ensure that user-controlled (anchor tag with target="_blank") links have the following attribute set: 

Copy
rel="noopener noreferrer"
More about the fix: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#tabnabbing﻿


2. Content security policy
CRITICALITY:
An attacker may inject scripts into the HTML files to steal user's information, such as Cookie, JWT token. If the CSP header is not offered, the browser will use same-origin policy standard, attackers can do XSS attack by injecting <img/> tags or <script/> tags.

SUGGESTED FIX:
Currently we have two kinds of projects:

S3 bucket project: The CI uploads webpack compiled static files to AWS S3 bucket,  the server is served by AWS cloud front.
Node project: The project has one node server to serve itself.
For S3 bucket project
Most of the CSP directives can be added using <meta/> tags.

install csp-html-webpack-plugin into the projectyarn add -D csp-html-webpack-plugin

you can use the configuration in admin.aftership.com, including reCAPTCHA, Newrelic Browser & google-analytics.

Some directives such as frame-ancestors can not be added by <meta/> tag. A response header is needed to add to the website.

You cannot add frame-ancestors directive using <meta/>

add  frame-ancestor _and _X-Frame-Options _in AWS cloudfront _to avoid click jacking attack.

Validations

You can check your CSP content in [CSP Evaluator](https://csp-evaluator.withgoogle.com/).

3. Subresource Integrity
#
CRITICALITY
Attackers can inject arbitrary malicious content info files on the CDN.

SUGGESTED FIX
For files from CDN add integrity & crossorigin field in script and link  tags, you can calculate the hash by using SRI Hash Generator.

Copy
<script src="https://example.com/example-framework.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" 
        crossorigin="anonymous"/>
﻿

If the project is a S3 bucket project, the following webpack plugin can add integrity for the compiled statics.

﻿

webpack-subresource-integrity
﻿

You need to set output.crossOriginLoading to anonymous in webpack.config.js.

不推荐用SRI，因为integrity会加上用户的UA