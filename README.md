# npm-registry-proxy

Proxy npm registry, for enforcing cli as yarn or npm.

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
