---
type: post
category: plan
---
# Week 11: Unity on Web

I have been using Unity for a season now. Now I want to make a period conclusion on it, especially on web.

Before using Unity, I was told that the future UI will be Unity. Because it supports all platforms and provide more fascinating experience than normal web pages.

After trying it, I found that, firstly the bundle is just big. normally it will be bundled into 4 files, 2 of them are engine and the game files. the engine it self is more than 4MB. Although I tried to make as many as file into addressables, the game data is still 10MB. Yes, if you are making a game 10 to 20 MB to load is acceptable. However, I think it is still quite big for a normal web page. I think I will use needle to see if it can be smaller.

Secondly, the building precess is long. As the web build process only allows AOT, IL2CPP is the only option. The average building time is 20 minutes. With the help of addressables, the building time can be reduced base on what you have changed. But it right now only works locally. I am still looking for a solution to make the CI cache the addressables.

Another thing, debugging on webassembly is not possible in Unity. You can debug your code in Windows build. But if the code crush on only on web, then the only choice you have is to print out the log. You can't even know which file have the error because sourcemap is not supported.

However, unity is still a good choice for gaming on web. But if I want a gamefy web page, I think js framework like three.js or babylon.js is still a better choice.

## TypescriptGO

Typescript 7 is going to be rewritten in go. I tried the prototype version. A lot function are not implemented yet. Since it will greatly improve the type checking process. I like it.

## TV Show

ホットスポット is a Japanese TV drama that I started to watch this week. Talks about the main character finds her colleague is an alien. Very fun to watch and relax.