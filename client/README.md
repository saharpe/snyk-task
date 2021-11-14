# VueJS - NPM Package Dependecies Tree Builder

This repository contains a basic VueJS client application with a basic form.
The user can fill the form with a valid npm package name and a valid version of the package, when submitting the form the dependencies tree view of the requested package is shown below the form.

## Setup
```sh
npm install
```

### Run
```sh
npm run serve
```

### Build
```sh
npm run build
```

### Lints and fixes files
```sh
npm run lint
```

## Future improvements

* Add TESTS (!!!)
* Add the version of each dependency on the tree view
* Add loading component below the form while waiting for response from the server 
* Handle errors to make the user know what is going on when something is wrong
* Add more validations for each input field (semver validations for example..)
* Make it prettier




