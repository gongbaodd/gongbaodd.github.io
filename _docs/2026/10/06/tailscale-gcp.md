---
type: post
category: tech
---
# Using Tailscale on GCP

I applied free 200GB GCP instance referencing [this blog](https://blog.oool.cc/archives/google-cloud-free-tier-200gb-traffic-ultimate-guide-2026). 

Managing virtual instances is becoming harder than harder nowadays. Firstly, it doesn't provide sudo support as default. I have to add the user into sudoers in startup scripts.

```shell
#!/bin/bash
usermod -aG sudo gongbaodd
```

And to login the server through ssh also super hard. Managing the keys is the pain. That brought me, Tailscale can do that, using `sudo tailscale set --ssh` in the GCP instance can setup a tunnel through tailscale, and tailscale can handle the permission stuff. 

Great job, Tailscale!