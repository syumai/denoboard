# Denoboard

- bulletin board application implemented in Deno.

## Usage

```ts
deno run -A app.ts
```

### Using Docker

```console
docker build . -t denoboard:latest
docker run -p 8080:8080 denoboard:latest
```

## Deployment

- This workflow deploys app to Heroku.

```console
heroku login
heroku container:login
make deploy
```

## Status

WIP
