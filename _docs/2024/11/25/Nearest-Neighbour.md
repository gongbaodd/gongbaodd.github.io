---
type: post
category: fe
---

# Nearest Neighbour Algorithm

I wanted to use my 2D graphic homework to combine my digital graphic homework. The game link is [here](https://box-ball-jztm.vercel.app/). My idea is to load the pixel art and scale it using nearest neighbour algorithm and send it into GPU buffer, using shader to make animate effects.

```js
loadImage(img) {
    img.loadPixels()

    const scaledImg = createImage(width, height);
    const xFactor = width / img.width
    const yFactor = height / img.height

    scaledImg.loadPixels();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let origX = floor(x / xFactor);
        let origY = floor(y / yFactor);

        let origIndex = (origY * img.width + origX) * 4;
        let r = img.pixels[origIndex];
        let g = img.pixels[origIndex + 1];
        let b = img.pixels[origIndex + 2];
        let a = img.pixels[origIndex + 3];

        let newIndex = (y * width + x) * 4;
        scaledImg.pixels[newIndex] = r;
        scaledImg.pixels[newIndex + 1] = g;
        scaledImg.pixels[newIndex + 2] = b;
        scaledImg.pixels[newIndex + 3] = a;
      }
    }

    scaledImg.updatePixels();

    this.img = scaledImg
}
```

To load the image into shader is easy, use `texture2D()` function. Use `mix()` function to mix the color.

```glsl
varying vec2 vTexCoord;
uniform sampler2D uImage;

void main() {
    vec4 imgColor = texture2D(uImage, vTexCoord);

    vec4 dotColor = mix(vec4(0.6, 0.6, 0.6, 1.),imgColor, .4);
    ...
}
```

## RenderDoc

Using RenderDoc to [inject Chromw process](https://edw.is/renderdoc-webgl/) is not very hard.

```cmd
cmd /C "set RENDERDOC_HOOK_EGL=0 && "C:\Program Files\Google\Chrome\Application\chrome.exe" --gpu-startup-dialog --disable_direct_composition=1 --disable-gpu-sandbox"
```

However, I still don't know how to use it to debug.
