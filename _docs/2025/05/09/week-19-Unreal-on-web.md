---
type: post
category: plan
tag:
    - UE
    - Unity
---
# Week 19: Unreal on Web

## Unity Async Experience

I have finished one development cycle of [an Unity project](https://gongbaodd.itch.io/ninja-paws). In this project, I tried to use ChatGPT to give the player comment. At the same time, I can try to use async functions to make net request.

The function looks like this:

```C#

    async Task<string> GetManagerComment()
    {
        var dishConfig = config.dishes[manager.dishIndex];
        var name = dishConfig.itemName.Replace(" ", "_");
        var url = $"url?name={name}";

        try
        {
            foreach (var item in gameState.checkItems)
            {
                if (item.count > 0)
                {
                    url += $"&{item.itemName}={item.count}";
                }
            }
        }
        catch
        {
            print("no game state");
        }



        using UnityWebRequest request = UnityWebRequest.Get(url);

        var asyncOpteration = request.SendWebRequest();

        while (!asyncOpteration.isDone)
        {
            await Task.Yield();
        }

        if (request.result == UnityWebRequest.Result.Success)
        {
            return request.downloadHandler.text;
        }

        return null;
    }
```

Pretty weird, I have to use `await Task.Yield()` to wait for the request. I think it is because UnityWebRequest is not a real async function. It just uses a coroutine to make the request. So I have to use `Task.Yield()` to wait for the coroutine.

