---
type: post
category: fe
---
# cloudflare worker 增加 CSP

```javascript
addEventListener('fetch', event => {

  event.respondWith(fetch(event.request)
      .then(function(response){
            response = new Response(response.body, response);
            // Set content-security-policy header to self and also include 
            // cloudflare workers dashboard to make it easy to preview
            response.headers.set("content-security-policy",
               "frame-ancestors 'self' https://dash.cloudflare.com;");

            return response;
        }

      ));
    

});
```