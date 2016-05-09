# Sails - React - Skeleton (Babel, Es6, MySql)

a [Sails](http://sailsjs.org) application


## 1. Install

```sh
$ nvm use 4.4.3
$ git clone
$ npm install
```

## 2. Configure

#### `config/connections.js`

```js
mySqlSails: {
  adapter: 'sails-mysql',
  host: 'localhost',
  user: 'sails-user',
  password: 'sails-password',
  database: 'sails-db'
}
```

#### `config/env/development.js`

```js
models: {
  connection: 'mySqlSails'
}
```

## 3. Start

```sh
$ sails lift
```
