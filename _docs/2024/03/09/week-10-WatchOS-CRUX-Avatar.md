---
type: post
category: plan
tag:
    - watchOS
    - CRUX
    - TTS
    - SpeechSynthesisUtterance
    - webXR
    - uikit
    - avatar
---
# Week 10: WatchOS CRUX and Avatar

Last week I learnt how to make a wearOS app. This week, I tried to learn how to make a watchOS app. It is a note app tutorial made by [Credo Academy](https://www.youtube.com/c/CredoAcademy), I found some one pushed the whole code to [this repo](https://github.com/universeye/applewatch-note-app/tree/master). I had to say, swift is way much easier than kotlin.

## Web TTS

Another thing, I want to have a better experience in my pasa-thay APP. I decided to add TTS on that. Turns out TTS on web is already a thing. Called [Speech Synthesis Utterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang), Country code can be found in [this link](https://www.ibm.com/docs/en/rational-soft-arch/9.6.1?topic=overview-locales-code-pages-supported). There are many English examples online. A Thai voice differs between platforms.

```js
    const voices = window.speechSynthesis.getVoices()
    msg.voice = voices.find(voice => voice.lang === 'th-TH')
```

## @pmndrs/uikit

I also found a cool new library for react-three-fiber, called [uikit](https://github.com/pmndrs/uikit). They implement shadcn on canvas. This [tweet](https://twitter.com/BelaBohlender/status/1763258175770235046) is a showcase on webXR. I tried it, it was a little laggy on my headset.


## CRUX

Last week, I found [CRUX](https://redbadger.github.io/crux/). Which is a solution for cross platform software. If you are familiar to state management, you can think it as a cross platform state manager. This framework generates state functions and type definitions. In web platform, it was wasm. In android it was JNI package. I have not tried iOS yet. Next week, I will try to make it possible on flutter and iOS. And I will try to make a moon starter repo template.

The web implementation is easy, it's [core](https://github.com/gongbaodd/all-the-demos/blob/main/crux/usemoon/packages/next-app/lib/core.ts) lib is only a copy and paste work. Only need to use the `update` API. The major [apis](https://github.com/gongbaodd/all-the-demos/blob/main/crux/usemoon/packages/next-app/models/hello.ts) are `ViewModel` and `Events`. Use the following code to dispatch an action.

```ts
    update(new EventVariantNone(), vm => {
        vModel = vm as ViewModel
    })
```

On android side, it is a little hard to start. The package is highly rely on the JNI version. But to write the code is easy. I am also afraid that rust support on Windows can be buggy, but I didn't meet any trouble.

```kt
fun View(core: Core = viewModel()) {
    core.update(Event.Increment())
}
```

## Avatar: The Last Airbender

[Avatar: The Last Airbender](https://www.pogdesign.co.uk/cat/Avatar-The-Last-Airbender-2024-summary) is a new netflix series, originally was an animation in 2005. It was a fantasy story based on Eastern asia culture(majorly Chinese). I was stoned that the story was not totally from an asian writer. The way they split the culture and reassembled into 4 different nations is amazing. I finished the series this week and intend to watch the animation next week.