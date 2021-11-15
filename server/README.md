
# NodeJS Server - NPM Package Dependencies Tree 

NodeJS has a managed packages environment called `npm`. A package is a
functional NodeJS module with versioning, documentation, dependencies (in the
form of other packages), and more.

This repository contains a basic NodeJS server with a `/package` endpoint. 
When passed a package name and version, the endpoint returns the dependencies tree of that
package.

## Setup

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

## Run 
```sh
npm start
```

### Request

Default port is `3000`

Request example:
`GET` to `http://localhost:3000/package/{name}/{version}`

Response example:
```json
{
  "name": "packageName",
  "version": "packageVersion",
  "dependencies": [
    {
      "name": "packageName",
      "version": "packageVersion",
      "dependencies": []
    },
    {
      "name": "packageName",
      "version": "packageVersion",
      "dependencies": [
        {
          "name": "packageName",
          "version": "packageVersion",
          "dependencies": []
        }
      ]
    }
  ]
}
```

Object data propeties:
* `name` - Contains the requested package name (`react` for example)
* `version` - Contains the requested version of the package (`16.14.0` for example)
* `dependencies` - Contains the dependencies of the the requested package, empty array `[]` when there are no dependencies for the package


## Future improvements

* Add TESTS (!!!)
* Add another 2 routes which, one for creating a tree of devDependencies and another that adds them
* Add more validations to make the API bullet-proof
* Add more validations on `helpers/versions.ts` and use SemVer module to parse versions properly
* Handle properly the returned errors from npm-registry API 
* Handling requests for dependencies that return versions range (>= / <= and more..)
* Check response statuses from npm-registry API
* Creating a seperated npm-registry client file with function that recieves a target url, performs a GET request (avoiding duplicated code..) and returns data
* If more time was provided, probably taking the more OOP approach (NPMPackage class which implements a node tree and can access children/parent on instance for example)




