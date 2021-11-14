import { RequestHandler, Request, Response, NextFunction } from 'express';

import got from 'got';

import { NPMPackage, ModifiedNPMPackage } from '../types';

import { parseVersion } from '../helpers/versions';

/**
 * Attempts to retrieve package data (name, version, dependencies) from the npm-registry and 
 * build the full dependencies tree of the requested package and return it
 */
export const getPackageDependenciesTree: RequestHandler = async function (req: Request, res: Response, next: NextFunction) {
  const { name, version } = req.params;

  try {
    const npmPackage: NPMPackage = await got(`https://registry.npmjs.org/${name}`).json();
    const dependencies = npmPackage.versions[version].dependencies;

    // Create the result object
    let npmPackageDataResult: ModifiedNPMPackage = {
      name: name,
      version: version,
      dependencies: []
    }

    // Build dependencies tree for the requested package
    await buildDependenciesTree(npmPackageDataResult.dependencies, dependencies);

    return res.status(200).json(npmPackageDataResult);
  } catch (error) {
    return next(error);
  }
};

/**
* Attempts to build a full dependencies tree of a given root npm package recursively
*/
const buildDependenciesTree = async (packageDependenciesArray: ModifiedNPMPackage[], dependenciesObject?: { [packageName: string]: string }) => {
  // Iterate over a dependencies object keys
  for (const packageName in dependenciesObject) {

    const packageVersion = dependenciesObject[packageName];
    const parsedPackageVersion = parseVersion(dependenciesObject[packageName]);

    // Build current package object
    let currentPackageObject: ModifiedNPMPackage = {
      name: packageName,
      version: packageVersion,
      dependencies: []
    }

    // Push current package dependencies 
    packageDependenciesArray.push(currentPackageObject);

    try {
      // Get dependencies of a requested package by name & version
      const packageDataResponse: { name: string, version: string, dependencies: { [packageName: string]: string } } =
        await got(`https://registry.npmjs.org/${packageName}/${parsedPackageVersion}`).json();

      // Check if response object has a 'dependencies' key
      if (packageDataResponse.hasOwnProperty('dependencies')) {
        const dependencies = packageDataResponse.dependencies;

        // Check if dependencies key is not null or empty, if so dive deeper until we get a 'leaf' in terms of trees..
        if (dependencies && Object.keys(dependencies).length) {
          await buildDependenciesTree(currentPackageObject.dependencies, dependencies);
        }
      }
    } catch (error) {
      console.log(`could not fetch data for: ${packageName}(${packageVersion})`);
      // handle error properly...
    }
  }
}

