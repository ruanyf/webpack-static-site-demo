This repo is a demo of [static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin). I am inspired by Jxnblk's article ["Static Site Generation With React Aad Webpack"](http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/).

## Usage

First, clone the repo.

```bash
$ git clone https://github.com/ruanyf/webpack-static-site-demo.git
```

Second, install the dependencies.

```bash
$ cd webpack-static-site-demo
$ npm intall
```

Third, generate the static file.

```bash
$ npm run build
```

## Explanation

### Webpack config

The `static-site-generator-webpack-plugin` add a handler function into webpack's configure.

```javascript
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new StaticSiteGeneratorPlugin('main', paths, {template: template, bundlejs: 'bundle.js'})
  ]
};
```

Note you have to compile the Webpack's output module into the format of UMD or CommonJS.

```javascript
output: {
  filename: 'index.js',
  path: 'dist',
  /* IMPORTANT!
  * You must compile to UMD or CommonJS
  * so it can be required in a Node context: */
  libraryTarget: 'umd'
},
```

### Constructor's Arguments

`static-site-generator-webpack-plugin`'s constructor accepts three arguments.

```javascript
function StaticSiteGeneratorWebpackPlugin(renderSrc, outputPaths, locals) {
  this.renderSrc = renderSrc;
  this.outputPaths = Array.isArray(outputPaths) ? outputPaths : [outputPaths];
  this.locals = locals;
}
```

(1) `renderSrc`

`renderSrc` is asset file's name or chunk name. For example, `webpack.config.js` looks like the following.

```javascript
// webpack.config.js
  entry: {
    main: './index.js'
  },
  output: {
    path: 'public',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  }
```

Then the `renderSrc` could be `main` or `bundle.js`.

(2) `outputPaths`

`outputPaths` is an array which comprises the static site's paths.

```javascript
var paths = [
  '/',
  '/app/',
  '/inbox/',
  '/calendar/'
];
```

if your `outputPaths` is the above, output will be the following.

- /index.html
- /app/index.html
- /inbox/index.html
- /calendar/index.html

If the providing paths end in `.html`, you can generate custom file names other than the default `index.html`.

```javascript
var paths = [
  '/a.html',
  '/app/b.html',
  '/inbox/c.html',
  '/calendar/d.html'
];
```

(3) locals

`locals` is an object which you put every extra property into.

```javascript
plugins: [
  new StaticSiteGeneratorPlugin('index.js', paths, { template: template }),
]
```

In the above code, a `template` property could be get from `locals`.

You also can get three default properties from `locals`.

- `locals.path`: The path currently being rendered
- `locals.assets`: An object containing all assets
- `locals.webpackStats`: Webpack's stats object

### Entry file

The entry JavaScript file looks like the following.

```javascript
// Client render (optional):
if (typeof document !== 'undefined') {
  // Client render code goes here...
}

// Exported static site renderer:
module.exports = function render(locals, callback) {
  callback(null, locals.template({ html: '<h1>' + locals.path + '</h1>' }));
};
```

The entry file should be a CommonJS module which exports a function to generate the static html file.

The exported function receives two arguments: 

- `locals` object. We usually put the template into `locals.template`.
- `callback` function. It receives two arguments: `err` object and html string provided by `static-site-generator-webpack-plugin`. If no error, `callback` transfers the html string to Webpack to write down on hard disks later.

## License

MIT

