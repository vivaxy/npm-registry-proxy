# npm-registry-proxy

Proxy npm registry, for enforcing cli as yarn or npm.

Read Explanation Articles: [Use npm Registry to Restric Installing Client](https://vivaxyblog.github.io/2019/09/30/use-npm-registry-to-restrict-installing-client.html).

## Usage

Add `.npmrc` in your project root or home.

```diff
-registry="https://registry.npmjs.org/"
+registry="https://npm-registry-proxy.vivaxy.now.sh/yarn/https%3A%2F%2Fregistry.npmjs.org%2F/"
```

Now, you can only use `yarn` for installing dependencies.

## API

`https://npm-registry-proxy.vivaxy.now.sh/${cli}/${registry}/`

### cli

`npm` or `yarn`

### registry

Any npm registry.

`registry` should be URI encoded.
