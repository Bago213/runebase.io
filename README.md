# runebase.io

## Install
Mongodb
```
to be removed

```
### Base Install

#### Dev
```
git clone https://github.com/runebase/runebase.io
cd runebase.io
npm i
```

Create the bundle with browerify-hmr disabled for production. remove from package before running 'npm i' (needs to be moved to dev-only dependencies). browerify-hmr is used in development only.
```
browserify -t vueify -e src/wallet/main.js -o public/javascripts/bundle.js -v
```
### Github Webhook

```
to be removed

```

### Github

```
exploration area for api calls

```

## Usage

### development

```

npm run dev

```
### Production

```

npm start

```
