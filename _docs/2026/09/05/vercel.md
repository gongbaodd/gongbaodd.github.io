---
type: post
category: tech
tag:
    - vercel
---

# Vercel Deployment Storage Excess

I just receive a message that my vercel deployment storage is over 10GB. I have set the deployment retention. 

After some check, turns out there are over 119 deployments of renovate, so I added ignores on the vercel.json.

```js
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "renovate/**": false
    }
  }
}
```

Good thing of having claude is that I can use vercel CLI to delete all these deployments.

Now, I make the retention into 1 week, as I will rebuild this project in every week. So it should be fine.