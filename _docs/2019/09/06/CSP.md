---
type: post
category: fe
---

# Frontend Security: CSP and Essential Web UI Protection

Security isn't just a backend concern - your frontend needs protection too! Before diving in, make sure you've read through "51 penetration test" and the "Front-End-Checklist" for the full picture.

## 1. Reverse Tab Nabbing - The Sneaky Attack

**What's the deal?**
Ever clicked a link that opens in a new tab? Attackers can hijack your original tab and redirect it to a phishing site while you're distracted. Pretty sneaky, right?

**The simple fix:**
Just add this to any user-controlled links with `target="_blank"`:

```html
rel="noopener noreferrer"
```

That's it! This prevents the new page from accessing your original tab.

Want the technical details? Check out [OWASP's HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#tabnabbing).

## 2. Content Security Policy (CSP) - Your XSS Shield

**Why you need this:**
Without CSP, browsers fall back to same-origin policy, which leaves you vulnerable to XSS attacks. Attackers can inject `<img/>` or `<script/>` tags to steal cookies, JWT tokens, and other sensitive data.

**Implementation depends on your setup:**

### For S3 Bucket Projects
When your CI uploads webpack files to AWS S3 and serves via CloudFront:

1. **Install the CSP plugin:**
   ```bash
   yarn add -D csp-html-webpack-plugin
   ```

2. **Use proven configurations:** Check out the setup from admin.aftership.com - it covers reCAPTCHA, New Relic Browser, and Google Analytics.

3. **Handle frame-ancestors separately:** Some directives can't use `<meta/>` tags and need response headers. Add `frame-ancestors` and `X-Frame-Options` in AWS CloudFront to prevent clickjacking.

### For Node Projects
When you have a Node server handling everything, you can set CSP headers directly in your server configuration.

**Validate your setup:**
Use [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/) to check if your policy is solid.

## 3. Subresource Integrity (SRI) - Trust But Verify

**The problem:**
CDNs can be compromised, and attackers might inject malicious content into your external scripts and stylesheets.

**The solution:**
Add integrity checks to your external resources:

```html
<script src="https://example.com/example-framework.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" 
      crossorigin="anonymous"/>
```

Generate hashes using the [SRI Hash Generator](https://www.srihash.org/).

### For S3 Projects with Webpack
Use the `webpack-subresource-integrity` plugin and set `output.crossOriginLoading` to `"anonymous"` in your webpack config.

**Pro tip:** SRI isn't always recommended for user-generated content since integrity hashes can include user agent information, potentially creating privacy concerns.

---

**Bottom line:** These three techniques form a solid foundation for frontend security. They're not magic bullets, but they'll protect you from the most common web-based attacks. Stay vigilant out there!