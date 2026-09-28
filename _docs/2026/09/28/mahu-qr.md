---
type: post
category: tech
tag:
    - portfolio
cover:
    url: https://res.cloudinary.com/dmq8ipket/image/upload/v1790593980/IMG_3896_nwqlne.jpg
    alt: mahu QR
---
# MahuQR: an Artistic QR Code Maker

Last week, I made the QR code CLI tool made for grandpa's bee haven a sever, [Mahu QR](https://qr.growgen.xyz).

| | |
|-|-|
| ![page](https://res.cloudinary.com/dmq8ipket/image/upload/v1790596207/Screenshot_20260928_144829_ij8fc9.png) | ![](https://res.cloudinary.com/dmq8ipket/image/upload/v1790593980/IMG_3896_nwqlne.jpg)  |

This is the first app I made that is totally vibe-coded with opencode and GLM5.3-flash. During the building time, I only make the stack choice and some algorithm plans.  Instead of a remote server, I made this tool into wasm and the process is fully runing inside of the browser.

For the core, I made it into a npm package, [@gongbaodd/qr-renderer](https://www.npmjs.com/package/@gongbaodd/qr-renderer). The QR code is generated using `uqr` and `@resvg/resvg-wasm` for svg editing and `@jsquash/png` for exporting. These packages allows the core can run inside a webassembly environment.

For the web part. I use next.js, as it is strongly supported by different AI agents. After attending the [lock in and build hackathon](https://creators.spotify.com/pod/profile/growgen/episodes/ep-e3pg7ev), I think I will consider Tanstack, as Lovable is heavily using Tanstack, when I deeply dived into the stack, I can see tanstack can serve a better role in debugging.

Anyway, for strict type check, I used stylex instead of tailwind, and zustand for state management. The component style I chose wired-elements.

You can edit the QR code shape into different icons, the icons are from [Grida](https://icons.grida.co), served from cloudflare worker.

If you check the export, you can find a JSON export feature. My plan is that this tool can export QR Code into a config file. And an API can accept the JSON config with user's personal string to mass production. However, Cloudflare workers has a CPU limit, I have to check a stable plan to make it work.

