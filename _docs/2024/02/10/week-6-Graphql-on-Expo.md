---
type: post
category: plan
tag: 
 - graphql
 - graphql-yoga
 - expo
 - urql
 - graphql-scalars
 - expo-router
 - ionic
 - astro
---
# Week 6: Graphql on Expo

In [2023/05/29](../../../2023/05//29/21st-week-cloudflare-workers-and-graphql-yoga), I wrote about how to use graphql-yoga in cloudflare worker. This week I tried to make another API and use URQL as a client in Expo Go.

## Cloudflare Worker

I was intended to use D1 as the database, and try to use drizzle as an ORM. But since I have got too many to work, I decided to use KV to save data as strings.

## GraphQL Yoga

[Graphql Yoga](https://the-guild.dev/graphql/yoga-server) is always perfect for me. This time I have learnt more. One is the bulk request, I learnt from [this blog](https://sylhare.github.io/2022/04/26/How-to-bulk-mutate-in-graphql.html).

Besides making a bulk mutation from the server side. You can also send mutations with alias like.

```graphql
mutation(
    $inputOne: UpdateEntityInput!,
    $inputTwo: UpdateEntityInput!,
    $inputThree: UpdateEntityInput!,
    $inputFour: UpdateEntityInput!
) {
    updateOne: updateEntity(input: $inputOne) {
        user { id }
    }
    updateTwo: updateEntity(input: $inputTwo) {
        user { id }
    }
    updateThree: updateEntity(input: $inputThree) {
        user { id }
    }
    updateFour: updateEntity(input: $inputFour) {
        user { id }
    }
}
```

Another one, the `Fragments`, I always thought I can write a fragment for mutations. But it was only for queries.

## GraphQL Scalars

[GraphQL Scalars](https://github.com/Urigo/graphql-scalars) is like a lot type definitions for graphql. I used `Timestamp` and `UUID` in my project.

## URQL

There is a little problem in using URQL with Expo. In Expo v50, they upgrade the bundler Metro. Before this version, you will get "package unresolved" problem. So, make sure URQL to update Expo to v50. I tried all the other solutions. It seems the graphql's problem. 

Then, there's another problem. Because I was using v49, I tried to use `graphql-yoga/sofa` to transform my schema to rest API. But it was not work as expected in cloudflare workers, I think it's a bug. To save time I decided to upgrade expo to v50.

## .env in Expo

I don't think it's a bug, but if I put a `.env` file in my project. In `expo-cli`, it will inform that the env was loaded. But it was not. In the document they just talked about `eas-cli`, damn, they made too many tools with the same functions. So I installed a babel plugin `react-native-dotenv` to solve the problem.

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env.local",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};

```

## Expo Router

Expo Router is a new feature in Expo v50. Now you can write a react native app in a next-js way. It was a shallow wrap of react native navigation. There was some confusion on the router names. But they will notify you in the console.

## Monorepo in Expo

Using monorepo in Expo is a little bit tricky. Since the native package was highly rely on the `package.json` in the root folder. Make sure all the packages that are native related should in the root `package.json`. Or there will be a crush in the production App.

Building an App in production is a pain in the ass. It may act totally different in the Expo Go client. And the JS thread just too weak, like the web front end in early days.

And test, unit test, of course I will use vitest. But integration test is a little hard, I actually have not found a better tool, especially I am using a Mac VM in windows.

## Astro in Ionic

Yes, I checked some other frameworks. Like ionic, sadly it was still in a PWA status. I mean since transition view was out, we should try some multiple page stuff. But they have their reason, iOS have not support transition view yet. This is [a video about running astro 3.0 on ionic](https://www.youtube.com/watch?v=ZFNwTJiDEvU&ab_channel=SimonGrimm).
 
## TV

`Mr & Mrs Smith` an under covered marriage drama, good to watch.

## Food

Tried KFC in Thailand. Price is cheaper than Mcdonald. Not so tasty, beverage is self-helped.