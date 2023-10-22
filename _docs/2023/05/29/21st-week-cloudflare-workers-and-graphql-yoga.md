---
type: post
category: plan
---
# 21st Week: Cloudflare Workers and GraphQL Yoga

I've been working on adding a backend for qwert-learner.

To keep this App a static site, I decided to ditch the Restful API and use GraphQL instead. Since it only requires one endpoint. A lot schemes can found like Azure functions, AWS Lambda, Google Cloud Functions, DigitalOcean Functions and Cloudflare Workers. MongoDB Atlas is a cheap choice for database. But Cloudflare workers can use KV to store data, which is a better choice for me.

Campared with Apollo Server, [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) is a lightweight one. Can be simply integrated with a lot providers like cloudflare. Here is the [document](https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-cloudflare-workers).

Developing cloudfalre workers is much easier with [wrangler](https://developers.cloudflare.com/workers/wrangler/). Can use [miniflare](https://miniflare.dev/testing/vitest) to do unit testing.

