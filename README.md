# runebase.io

### NVM
```
apt-get update
apt-get install build-essential libssl-dev
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
source ~/.profile

```

### Nodejs
```
nvm i v6
nvm use v6

```

### Base Install

#### Dev
```
git clone https://github.com/runebase/runebase.io
cd runebase.io
npm i
npm install browserify -g

```

Create the bundle with browerify-hmr disabled for production. remove from package before running 'npm i' (needs to be moved to dev-only dependencies). browerify-hmr is used in development only.
```
browserify -t vueify -e src/wallet/main.js -o public/javascripts/bundle.js -v
```

#### Nginx Server Block
```
server {
  server_name runebase.io www.runebase.io;
  gzip on;
  gzip_min_length 1000;
  gzip_comp_level 5;
  gzip_proxied any;
  gzip_vary on;
  gzip_types
    text/css
    text/javascript
    text/xml
    text/plain
    text/x-component
    application/javascript
    application/json
    application/xml
    application/rss+xml
    font/truetype
    font/opentype
    application/vnd.ms-fontobject
    image/svg+xml;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
    listen 80;
}

```

### PlaceHolder

```
placeholder

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
