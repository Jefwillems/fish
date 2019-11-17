[![Netlify Status](https://api.netlify.com/api/v1/badges/519e22b4-6abc-4cc8-a540-07c23c383bfd/deploy-status)](https://app.netlify.com/sites/adoring-volhard-3271fa/deploys)
# fish
eat the fish. Javascript game build with p5.js

* You can try out this game in it's current form (master branch) on this website: [fish.jefwillems.xyz](https://fish.jefwillems.xyz)

# How to install

These commands will download the source code of this project, and install it's dependencies.
```bash
$ git clone <this repository>
$ cd fish
$ npm install
```

# How to run the development server
```bash
$ npm run serve
```
Now check your terminal for a url on which the dev server is running.

# Build the project for production use
```bash
$ npm run build
```
This will build the project and it's dependencies in the **dist** folder.
You can point your webserver to this folder or copy over the files to your desired location.

# todo

* post scores to a firebase app
* create the about screen
* add bosses that shoot at you
