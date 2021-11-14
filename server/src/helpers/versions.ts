/**
* Parse a npm package's version string
*/
export const parseVersion = (version: string) => {
    // add more ifs to handle more senarios probably with semver module (!!)
    if (version.startsWith('^') || version.startsWith('~')) {
        version = version.substring(1);
    }

    return version;
}