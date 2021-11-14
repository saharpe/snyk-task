# Snyk Task 

<img src="https://snyk.io/wp-content/uploads/title-card-logo-black.png"><img>
<br>
This repository contains an E2E project that contains a VueJS application and a NodeJS server.
The applications allows users to get the full dependencies tree by a given npm package and its version.

### Requirements

- Update the `/package` endpoint, so that it returns all of the transitive dependencies for a package, not only the first order dependencies
- Present these dependencies in a tree view that can be viewed from a Web Browser (you can use any technologies you find suitable)

# Setup

## Server
To install dependencies and start the server in development mode:

```sh
npm ci
```

You can run the tests with

```sh
npm run test

# Or in watch mode
npm run test -- --watch
```

## Client
```sh
npm install
```

# Run

## Server 
```sh
npm start
```

## Client
```sh
npm run serve
```

# NOTES

Each of the repositories inside (server/client) has a README file which provides further details on how it actually works, take a look!

# Future imporvements

* Add a script which will run the client & server together

