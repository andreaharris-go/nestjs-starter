<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirement

```bash
nodejs >= 18
npm >= 9
docker-compose >= 2.20
```

## Environment Set Up
```bash
$ docker-compose up -d

$ cd gateway
$ npm install

$ cd service-example
$ npm install
```
then shell to Vault server and set environment variable, and init admin policies
```bash
$ export VAULT_ADDR='http://0.0.0.0:8200'
$ export VAULT_TOKEN="123456789"

$ vault auth enable approle
$ vault write auth/approle/role/admin secret_id_ttl="720h"  token_ttl="12h"  token_max_tll="12h"  policies="admin"
$ vault read auth/approle/role/admin/role-id
$ vault write -f auth/approle/role/admin/secret-id
```
checking Vault service on browser
```bash
URL: localhost:8200
Token: 123456789
```
![Screenshot](docs/assets/vault-login.png)

Edit default policies with this:
```javascript
path "secret/*" {
    capabilities = ["read"]
}
```
![Screenshot](docs/assets/vault-default-policies.png)

## First Vault secret for MongoDB
In secret engine and new key and value
```bash
{
  "HOST": "0.0.0.0",
  "MONGODB_HOST": "mongodb://userexample2:example@localhost/example",
  "PORT": "3002"
}
```
![Screenshot](docs/assets/vault-secret.png)

## Init MongoDB database
```bash
$ mongosh -u root -p example

# then create db and user
$ use example
$ db.createUser({user:"userexample2",pwd:"example",roles:[{role:"readWrite",db:"example"}]})
```

## Running the app
Open two tab for running "gateway" and "service-example"
```bash
$ npm run build
$ npm run start:dev
```
![Screenshot](docs/assets/app-running.png)

## Swagger UI
```bash
http://localhost:3001/docs
```
![Screenshot](docs/assets/swagger-ui.png)

## Support

No longer support by Duckdev84 LOL....
