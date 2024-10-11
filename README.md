# js-simple-cookie
A simple, lightweight JavaScript API for handling browser cookies

## Features

* No dependency
* TypeScript support

## Installation

### NPM

```sh
npm install js-simple-cookie
```

### CDN

Alternatively, include js-simple-cookie via [jsDelivr CDN](https://www.jsdelivr.com/package/npm/js-simple-cookie) or [unpkg](https://unpkg.com/js-simple-cookie).

## Usage

Import:

```js
import Cookies from "js-simple-cookie";
```

Create a cookie

```js
Cookies.set('name', 'value')
Cookies.set({ name: 'name', value: 'value' })
Cookies.set('name', 'value', { expires: 7000 })
Cookies.set({ name: 'name', value: 'value', expires: 7000 })
```

Read cookie:

```js
Cookies.get('name') // => 'value'
Cookies.get('nothing') // => undefined
```

Delete cookie:

```js
Cookies.remove('name')
Cookies.remove('name', '/')
Cookies.remove('name', '/', '.yourdomain.com')
```