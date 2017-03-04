# webpack2-static

Static website boilerplate with webpack2 using twig as html template engine and jeet with breakpoint for styling

### Package features

* [Webpack 2](https://webpack.js.org/) bundler
* [Yarn](https://yarnpkg.com/en/) Package manager
* [Twig.js](https://github.com/twigjs/twig.js/wiki) template engine for quick and modular dev
* [Jeet](http://jeet.gs/) for css layout
* [Breakpoint](http://breakpoint-sass.com/) for css media queries
* [BrowserSync](https://browsersync.io/) for browser testing
* [px2rem](https://github.com/CallMeXYZ/px2rem/blob/master/README-en.md) for automatic conversion of pixels to rem

### Generating pages

First you have to define your templates inside `./templates.json` file:
```json
  ...
  {
    "filename": "templates/newpage.html",
    "template": "./templates/newpage.html.twig"
  },
  ...
```
where `filename` is the output of the template and `template` is the location of twig file.

### Build and work

You can build the package with
```bash
yarn build
```
or for active development
```bash
yarn start
```
The project will be available in you browser here:
```
----------------------------------
      Local: http://localhost:3000
   External: http://10.0.1.3:3000
----------------------------------
         UI: http://localhost:3001
UI External: http://10.0.1.3:3001
----------------------------------
```
