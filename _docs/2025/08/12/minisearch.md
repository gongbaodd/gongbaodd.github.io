---
type: post
category: fe
tag:
    - fuzzy-search
---

# MiniSearch: An in-browser Search Engine

I am working on rebuilding my website. Years ago, I want to add an [algolia](https://www.algolia.com/) search feature. I was just too lazy to implement that. Turns out, you do not need to build an [Elasticsearch](https://www.elastic.co/elasticsearch) backend, An in browser search engine called [Mini Search](https://github.com/lucaong/minisearch) provides all the features that I need.

Here is a [article](https://lucaongaro.eu/blog/2019/01/30/minisearch-client-side-fulltext-search-engine.html) by the author about this search engine. It uses radix tree to index contents and TF-LDF algorithm to do fuzzy search. The author also compared it with two other search engines, [Lunr.js](https://lunrjs.com/) and [fuse.js](https://www.fusejs.io/).