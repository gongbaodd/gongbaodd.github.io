---
type: post
category: tech
tag: 
    - wsl
    - reverse-proxy
    - web-ble
    - https
    - caddy
---
# FAILED - Reverse Proxy WSL for Web-BLE development

I am continuously fighting the network connection between my local ones and the WSL one. I used to use ngrok which is mentioned in [ngrok: A Reverse Proxy Service](/fe/2023/05/18/ngrok-reverse-proxy-service). However, as the user group grow, that server is not reliable anymore.

So I tried some other plans like port forwarding. Start a https server in WSL and use `netsh` to forward the https port out. I also found a GUI tool, [PortProxyGUI](https://github.com/zmjack/PortProxyGUI) mentioned in [week 11](/plan/2024/03/16/week-11-vr-galaxy-watch-6) to do this. The forward port is not stable, and because it is https, I can not see any log in my terminal.

Eventually, recently I decide to develop a Web-BLE project. I tried to use Caddy to build a Windows https server, which reverse proxy the WSL http server. It works well. But it cannot reverse proxy the websocket connection. I can only serve the static files. However, I will record some configuration here.

```
https://<localNetworkAddress>:5173 {
 reverse_proxy http://<wslNetworkAddress>:5173
 tls internal
}

https://localhost:2015 {
 respond "Hello, world!"
 tls internal
}

https://<localNetworkAddress>:2015 {
 root * "<staticFilesPath>"
 file_server browse
 tls internal
}
```

Make the configuration file `Caddyfile`. In the same folder call `caddy run` to start the server.

Another failure is the web-ble. iOS itself does not support web-ble. I have to use a third-party app to test it. I tried to use Bluefy I mentioned in [20th week web BLE](plan/2023/05/21/20th-week-web-ble). As so many bluetooth devices I can search in Android, the browser got none of them. So, I guess it is either the API failed or some bluetooth protocols are not supported by iPhone.

```js
 const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [] // Add specific services if needed
});
```