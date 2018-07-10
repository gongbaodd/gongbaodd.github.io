---
type:  post
category: fe
---

# 没有手动配置过 Apollo 都不知道 Meteor 帮你做了多少事

## Server 端

```ts
export class AppModule implements NestModule {
  graphiql(customer: MiddlewareConsumer) {
    if (!isDev) return;
    customer
      .apply(graphiqlExpress({ endpointURL: graphql }))
      .forRoutes(graphiql);
  }
  graphql(customer: MiddlewareConsumer) {
    customer
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes(graphql);
  }
  configure(customer: MiddlewareConsumer) {
    this.graphiql(customer);
    this.graphql(customer);
  }
}
```

## client

```typescript
@Component({
  components: {
    MeCard,
    Links
  },
  apollo: {
    hello: {
      query: gql`
        {
          hi
        }
      `,
      update(data) {
        return data.hi;
      }
    }
  }
})
export default class IndexPage extends Vue {
  data() {
    return {
      hello: ""
    };
  }
}
```

同时要在 nuxt 配置中增加 apollo 的配置项

```typescript
[
  "@nuxtjs/apollo",
  {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.HTTP_ENDPOINT || "http://localhost:3000/graphql"
      }
    }
  }
];
```
