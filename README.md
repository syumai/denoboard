# Denoboard

- message board application implemented in Deno.

## Demo

https://denoboard.herokuapp.com/posts

## Usage

```ts
deno run -A app.ts
```

### Using Docker

```console
docker build . -t denoboard:latest
docker run -p 8080:8080 -e PORT=8080 denoboard:latest
```

## Deployment

- This workflow deploys app to Heroku.

```console
heroku login
heroku container:login
make deploy
```

## Development

- This app is using [dem](https://github.com/syumai/dem) as module manager.
- If new module is needed as dependency, please use `dem add` and `dem link` to manage module.

## Status

WIP
