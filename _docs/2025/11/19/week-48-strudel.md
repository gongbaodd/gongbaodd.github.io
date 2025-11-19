---
type: post
category: plan
tag:
    - sonic-pi
    - MIDI
    - strudel
    - music-generation
    - portfolio
---

# Week 48: Smart Player with Strudel REPL

<iframe width="560" height="315" src="https://www.youtube.com/embed/PFYujqUuYeo?si=aoCYGviS8jJbWCSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I started this week trying to make some noise with [Sonic Pi](https://sonic-pi.net/). It's a fantastic tool, but we had a failure to communicate: it speaks Ruby, and I... well, I prefer JavaScript. 🙅‍♂️

After some digging, I stumbled upon [Strudel](https://strudel.cc/). It's a code REPL for music generation that brings the Tidal Cycles language right into the browser. The only catch? The [official workshop](https://strudel.cc/de/workshop/getting-started/) is in German. *Entschuldigung?* 🥨

## The "HarpTabs" Experiment 🧪

My initial brilliant idea 💡 was to take harmonica tabs from [HarpTabs](https://www.harptabs.com/), map them to notes, and ask an AI to generate a playback script.

Here is the highly scientific conversion table I used to map hole numbers to notes:

| Hole Number | Blow (Exhale) 🌬️ | Draw (Inhale) 😤 |
| :---: | :---: | :---: |
| **1** | C | D |
| **2** | E | G |
| **3** | G | B |
| **4** | C | D |
| **5** | E | F |
| **6** | G | A |
| **7** | C | B |
| **8** | E | D |
| **9** | G | F |
| **10** | C | A |

I fed this into the AI to generate a cover of **"No Surprises"** by Radiohead. Here is the code it spat out:

```js
// "No Surprises" Melody
note(`<
  [d e g e e d c e g]
  [d e e d c f b]
  [b b c d e]
  [e g g e e d c e]
  [e g g e e d]
  [f c b b c d e]
  [e g g e e d]
  [c e g g e e e d c]
  [f e d c b b c d]
  [f e d c b b c d]
  [f e d c b b c d]
  [e d c e d]
  [e e e e e f]
  [a f f f f a e]
  [f e d c b b c d]
  [f e d c b b c d]
  [f e d c b b c d d]
  [e e e e f]
  [e e e e f f]
  [f e d c b b c d]
  [a b d a a]
  [a b d a g]
>`)
.s("piano") // Sets the sound to a piano
.slow(2)    // Slows it down to make the phrasing clearer (adjust as needed)
```

The result? Well... let's just say Thom Yorke is safe. I’ve never heard *this* version of "No Surprises" before. 🙉

<iframe
src="https://strudel.cc/\#Ly8gIk5vIFN1cnByaXNlcyIgTWVsb2R5Cm5vdGUoYDwKICBbZCBlIGcgZSBlIGQgYyBlIGddCiAgW2QgZSBlIGQgYyBmIGJdCiAgW2IgYiBjIGQgZV0KICBbZSBnIGcgZSBlIGQgYyBlXQogIFtlIGcgZyBlIGUgZF0KICBbZiBjIGIgYiBjIGQgZV0KICBbZSBnIGcgZSBlIGRdCiAgW2MgZSBnIGcgZSBlIGUgZCBjXQogIFtmIGUgZCBjIGIgYiBjIGRdCiAgW2YgZSBkIGMgYiBiIGMgZF0KICBbZiBlIGQgYyBiIGIgYyBkXQogIFtlIGQgYyBlIGRdCiAgW2UgZSBlIGUgZSBmXQogIFthIGYgZiBmIGYgYSBlXQogIFtmIGUgZCBjIGIgYiBjIGRdCiAgW2YgZSBkIGMgYiBiIGMgZF0KICBbZiBlIGQgYyBiIGIgYyBkIGRdCiAgW2UgZSBlIGUgZl0KICBbZSBlIGUgZSBmIGZdCiAgW2YgZSBkIGMgYiBiIGMgZF0KICBbYSBiIGQgYSBhXQogIFthIGIgZCBhIGddCj5gKQoucygicGlhbm8iKSAvLyBTZXRzIHRoZSBzb3VuZCB0byBhIHBpYW5vCi5zbG93KDIpICAgIC8vIFNsb3dzIGl0IGRvd24gdG8gbWFrZSB0aGUgcGhyYXNpbmcgY2xlYXJlciAoYWRqdXN0IGFzIG5lZWRlZCk%3D"
width="600"
height="300"
></iframe>

## The Pivot: Building a Smart Player 🧠🎧

Realizing my career as a harmonica transcriber was over, I went hunting and found a [fan-made repo](https://github.com/eefano/strudel-songs-collection.git) collecting *actually good* Strudel scripts.

Since I was already messing around with vector search in my previous post about [EntityDB](https://www.google.com/search?q=/fe/2025/11/18/entity-db), I decided to combine the two.

**The Goal:** Create a smart music player that understands natural language requests.

**The Todo List:**

1.  🏷️ **Label the songs** (Let AI do the work).
2.  💾 **Embed the labels** (Vector database magic).
3.  🛠️ **Add Tool Use** (Teach the LLM to play DJ).

### 1\. Labeling the Songs

I wasn't going to listen to 50+ files and tag them manually. I asked Cursor to "hallucinate" (infer) descriptions based on the filenames. Here is the data structure:

```json
{
    "songs": [
        {
            "url": "/strudel-songs-collection/acertainbuzz.js",
            "description": "Fizzy drone with a certain buzzing energy."
        },
        {
            "url": "/strudel-songs-collection/ameliewaltz.js",
            "description": "Gentle Parisian-styled waltz for an Amelie moment."
        },
        {
            "url": "/strudel-songs-collection/anniesroom.js",
            "description": "Cozy chamber groove inspired by Annie's quiet room."
        },
        {
            "url": "/strudel-songs-collection/anothersatellite.js",
            "description": "Shimmering orbiting arpeggios like another satellite."
        },
        {
            "url": "/strudel-songs-collection/appealingtovenus.js",
            "description": "Sultry pulse that feels like serenading Venus."
        },
        {
            "url": "/strudel-songs-collection/aztecchallenge.js",
            "description": "Tribal percussion sprint evoking an Aztec challenge."
        },
        {
            "url": "/strudel-songs-collection/bennington.js",
            "description": "Emotive rock textures nodding to Bennington's voice."
        },
        {
            "url": "/strudel-songs-collection/bigship.js",
            "description": "Slow-building pads that feel like steering a big ship."
        },
        {
            "url": "/strudel-songs-collection/bluemonday.js",
            "description": "Punchy electro beat paying homage to Blue Monday."
        },
        {
            "url": "/strudel-songs-collection/breakfastline.js",
            "description": "Bright morning loop perfect for a breakfast line."
        },
        {
            "url": "/strudel-songs-collection/budsandspawn.js",
            "description": "Organic pulses bursting like buds and spawn."
        },
        {
            "url": "/strudel-songs-collection/bugfromheaven.js",
            "description": "Glitchy chirps of a celestial bug from heaven."
        },
        {
            "url": "/strudel-songs-collection/bustybeez.js",
            "description": "Chunky bass swarm buzzing like busty bees."
        },
        {
            "url": "/strudel-songs-collection/byebyespirit.js",
            "description": "Airy farewell motif whispering bye-bye spirit."
        },
        {
            "url": "/strudel-songs-collection/cabinet.js",
            "description": "Boxy percussive knocks echoing inside a cabinet."
        },
        {
            "url": "/strudel-songs-collection/cadenza.js",
            "description": "Virtuosic flourish patterned after a cadenza."
        },
        {
            "url": "/strudel-songs-collection/changetempowitharrows.js",
            "description": "Instructional click track to change tempo with arrows."
        },
        {
            "url": "/strudel-songs-collection/cinghiale.js",
            "description": "Earthy rumble charging like a wild cinghiale boar."
        },
        {
            "url": "/strudel-songs-collection/clandeisiciliani.js",
            "description": "Folksy dance figure for clan dei Siciliani."
        },
        {
            "url": "/strudel-songs-collection/clubbed.js",
            "description": "Thick four-on-the-floor groove built for being clubbed."
        },
        {
            "url": "/strudel-songs-collection/disto.js",
            "description": "Overdriven lines dripping with distortion."
        },
        {
            "url": "/strudel-songs-collection/edenontheair.js",
            "description": "Floating pads like Eden broadcast on the air."
        },
        {
            "url": "/strudel-songs-collection/elpueblo.js",
            "description": "Festive percussive chant honoring el pueblo."
        },
        {
            "url": "/strudel-songs-collection/enjoythesilence.js",
            "description": "Minimalist vortex referencing Enjoy the Silence."
        },
        {
            "url": "/strudel-songs-collection/epicbiopic.js",
            "description": "Cinematic swells suitable for an epic biopic."
        },
        {
            "url": "/strudel-songs-collection/eversoclosely.js",
            "description": "Intimate pulses brushing ever so closely."
        },
        {
            "url": "/strudel-songs-collection/happybirthday.js",
            "description": "Classic birthday melody rendered in Strudel style."
        },
        {
            "url": "/strudel-songs-collection/happybirthdayramones.js",
            "description": "Ramones-flavored blast of Happy Birthday."
        },
        {
            "url": "/strudel-songs-collection/heymoon.js",
            "description": "Dreamy nocturnal groove waving hey moon."
        },
        {
            "url": "/strudel-songs-collection/humanperformance.js",
            "description": "Angular rhythms inspired by Human Performance."
        },
        {
            "url": "/strudel-songs-collection/hydraswap.js",
            "description": "Shapeshifting layers that swap heads like a hydra."
        },
        {
            "url": "/strudel-songs-collection/ilredelmondo.js",
            "description": "Regal motif saluting il re del mondo."
        },
        {
            "url": "/strudel-songs-collection/jitterbug.js",
            "description": "Snappy swing loop built for the jitterbug."
        },
        {
            "url": "/strudel-songs-collection/jitterbugreverse.js",
            "description": "Backwards jitterbug pulses for a reversed swing."
        },
        {
            "url": "/strudel-songs-collection/lovegoeson.js",
            "description": "Warm chords repeating as love goes on."
        },
        {
            "url": "/strudel-songs-collection/madeallup.js",
            "description": "Playful loop confessing it was made all up."
        },
        {
            "url": "/strudel-songs-collection/magicandecstasy.js",
            "description": "Sparkling arps mixing magic and ecstasy."
        },
        {
            "url": "/strudel-songs-collection/mammalschilling.js",
            "description": "Laid-back beat picturing mammals chilling."
        },
        {
            "url": "/strudel-songs-collection/markovchain.js",
            "description": "Generative blips wandering like a Markov chain."
        },
        {
            "url": "/strudel-songs-collection/mouthbreather.js",
            "description": "Heavy breathing bassline for the mouth breather."
        },
        {
            "url": "/strudel-songs-collection/mouthbreathercomplex.js",
            "description": "Extended version of the mouth breather complex."
        },
        {
            "url": "/strudel-songs-collection/nudelimprov1.js",
            "description": "Sparse nude-limbed improv sketch number one."
        },
        {
            "url": "/strudel-songs-collection/oddeven.js",
            "description": "Alternating clicks exploring odd-even patterns."
        },
        {
            "url": "/strudel-songs-collection/oh.js",
            "description": "Minimal exclamation loop simply saying oh."
        },
        {
            "url": "/strudel-songs-collection/oldmacdonald.js",
            "description": "Playful rendition of Old MacDonald."
        },
        {
            "url": "/strudel-songs-collection/omalley.js",
            "description": "Crooning shuffle tipping a hat to O'Malley."
        },
        {
            "url": "/strudel-songs-collection/pumpupthejam.js",
            "description": "High-energy throwback pumping up the jam."
        },
        {
            "url": "/strudel-songs-collection/pyramidsong.js",
            "description": "Swaying rhythm honoring Pyramid Song."
        },
        {
            "url": "/strudel-songs-collection/rhythmofthenight.js",
            "description": "Italo-disco sparkle reliving Rhythm of the Night."
        },
        {
            "url": "/strudel-songs-collection/satiesfaction.js",
            "description": "Satie-esque meditation chasing satisfaction."
        },
        {
            "url": "/strudel-songs-collection/shanghai.js",
            "description": "Glittering tones evoking neon Shanghai."
        },
        {
            "url": "/strudel-songs-collection/shedontusejelly.js",
            "description": "Alt-rock wobble referencing She Don't Use Jelly."
        },
        {
            "url": "/strudel-songs-collection/sparky.js",
            "description": "Bright staccato sparks from a sparky loop."
        },
        {
            "url": "/strudel-songs-collection/stacktricks.js",
            "description": "Layered sequences stacking rhythmic tricks."
        },
        {
            "url": "/strudel-songs-collection/strangerthings.js",
            "description": "Analog suspense channeling Stranger Things."
        },
        {
            "url": "/strudel-songs-collection/strudelman.js",
            "description": "Playful hero theme for Strudelman."
        },
        {
            "url": "/strudel-songs-collection/strudelwall.js",
            "description": "Solid chord wall baked from strudel layers."
        },
        {
            "url": "/strudel-songs-collection/strumtest1.js",
            "description": "First strumming test pattern."
        },
        {
            "url": "/strudel-songs-collection/strumtest2.js",
            "description": "Second strumming test with added motion."
        },
        {
            "url": "/strudel-songs-collection/strumtest3.js",
            "description": "Third strumming test exploring variations."
        },
        {
            "url": "/strudel-songs-collection/swimandsleep.js",
            "description": "Lulling tide letting you swim and sleep."
        },
        {
            "url": "/strudel-songs-collection/swimmingsnake.js",
            "description": "Slippery lines coiling like a swimming snake."
        },
        {
            "url": "/strudel-songs-collection/tablaturetest.js",
            "description": "Prototype picking figure for a tablature test."
        },
        {
            "url": "/strudel-songs-collection/tarantella.js",
            "description": "Whirling folk rhythm straight from a tarantella."
        },
        {
            "url": "/strudel-songs-collection/ventocaldo.js",
            "description": "Warm desert breeze suggested by vento caldo."
        },
        {
            "url": "/strudel-songs-collection/verminmangle.js",
            "description": "Gritty textures mangling unruly vermin."
        },
        {
            "url": "/strudel-songs-collection/veronicainecstasy.js",
            "description": "Dramatic synths placing Veronica in ecstasy."
        },
        {
            "url": "/strudel-songs-collection/veronicazigzag.js",
            "description": "Zippy zig-zag sequence tailored for Veronica."
        },
        {
            "url": "/strudel-songs-collection/vine.js",
            "description": "Looping riff curling upward like a vine."
        },
        {
            "url": "/strudel-songs-collection/waltzno2.js",
            "description": "Melancholic sway reminiscent of Waltz No. 2."
        },
        {
            "url": "/strudel-songs-collection/woodeneye.js",
            "description": "Rustic knocks peering through a wooden eye."
        }
    ]
}
```

### 2. Embedding the Labels

This part was pleasantly simple. EntityDB provides a straightforward insert API, so we just loop through our AI-generated descriptions and store them.

```ts
export async function loadPlaylist() {
    const playlist = await requestPlayList()
    const db = $db.get()
    if (!db) {
        throw new Error("Database not initialized. Call createDB() first.")
    }

    for (const song of playlist) {
        const key = await db.insert({
            text: song.description,
            metadata: { id: song.url }
        })
        console.log({key, song})
    }
}
```

### 3\. React + Strudel = ❤️

Strudel doesn't provide a React component out of the box (rude), so I had to MacGyver one. I created a wrapper that injects the `strudel-repl` custom element into a DIV.

```ts
import { useCallback } from "react";
import { $song } from "../stores/playlist";

export default function Strudel() {
    const onLoad = useCallback((elem: HTMLElement|null) => {
        if (elem) {
            const editor = document.createElement('strudel-repl');
            editor.setAttribute(
                'code',
                $song.get() ?? ''
            );
            elem.appendChild(editor);

            // Cleanup logic
            return () => {
                if (elem) {
                    elem.removeChild(editor);
                }
            };
        }
    }, []);

  return (
    <div ref={onLoad}>
    </div>
  );
}
```

## The Result 🎉

The rest of the plumbing connects to the LLM logic from my previous EntityDB post. I can now ask for "spooky vibes" or "something for a Parisian cafe," and the tool finds the matching Strudel script and plays it instantly.
