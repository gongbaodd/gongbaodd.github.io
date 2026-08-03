---
type: post
category: tech
---

# Use Tailscale to Remote control Mac mini

This month, I have moved to a new place. This place provides a co-working space.

As a Mac mini user, I have to take the mac every where and super inconvenient.

Then as a Chinese programmer, manipulating VPNs is a simple work. [Tailscale](https://tailscale.com) is a P2P VPN service that builds on WireGuard protocol.

Setting up Tailscale is super easy, on linux, just run `sudo tailscale up`, on Mac, a desktop software can be installed.

After setting up, I can control my Mac using [No Machine](https://creators.spotify.com/pod/profile/growgen/episodes/ep-e3ivggt). 
Because it is P2P, the data runs in the building's router. The speed is acceptable.