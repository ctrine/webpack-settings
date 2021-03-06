<h1><img src="art/full-logo.svg" alt="borela-js-toolbox" height="150px"></h1>

[![GitHub watchers](https://img.shields.io/github/watchers/borela-tech/js-toolbox.svg?style=social)][watchers]
[![GitHub stars](https://img.shields.io/github/stars/borela-tech/js-toolbox.svg?style=social)][stars]
[![GitHub issues](https://img.shields.io/github/issues/borela-tech/js-toolbox.svg?style=social)][issues]
[![GitHub pulls](https://img.shields.io/github/issues-pr/borela-tech/js-toolbox.svg?style=social)][pulls]
[![GitHub forks](https://img.shields.io/github/forks/borela-tech/js-toolbox.svg?style=social)][forks]

[![Build Travis](https://img.shields.io/travis/borela-tech/js-toolbox.svg?style=flat-square&label=linux%20%26%20osx)][travis-build]
[![Build Appveyor](https://img.shields.io/appveyor/ci/borela/js-toolbox/master.svg?style=flat-square&label=windows)][appveyor-build]
[![NodeJS version](https://img.shields.io/badge/nodejs-%E2%89%A510.12.0-orange.svg?style=flat-square)][nodejs]
[![David](https://img.shields.io/david/borela-tech/js-toolbox.svg?style=flat-square)][david-dm]
[![Platforms](https://img.shields.io/badge/platforms-Windows%20%7C%20Linux%20%7C%20OSX-ff4081.svg?style=flat-square)][toolbox]
[![License](https://img.shields.io/badge/license-Apache%202.0-ba68c8.svg?style=flat-square)][toolbox]
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

Develop JavaScript apps/libraries with little to no configuration and still be
allowed to use all bleeding edge features available through [Babel][babel] and
[Webpack][webpack].

This tool can be installed globally and be used to compile any project that
follows the expected directory structure.

## Table of contents

1. [What’s included](#whats-included)
2. [Installation](#installation)
3. [Creating a simple JS library](#creating-a-simple-js-library)
4. [Creating an Express server](#Creating-an-express-server)
5. [Creating a Single Page React Application](#creating-a-single-page-react-application)
6. [More information](#more-information)

## What’s included

* Commands to scaffold, build, lint, test and run the app;
* All [Babel’s experimental plugins][experimental-plugins] are enabled by
  default;
* Polyfills are included based on the browsers and minimum NodeJS version
  supported by your project;

Some features must be enabled explicitly either through command flags,
configuration or project type:

* [Flow][flow];
* [React][react];
* [JSX][jsx];
* [TypeScript][typescript];

## Installation

```sh
npm install @borela-tech/js-toolbox -g
```

The toolbox uses ´“bb” as its command alias, to see the available options
type:

```sh
bb --help
```

## Creating a simple JS library

1. Navigate to the directory you want to create the project;
2. Run the command `bb scaffold lib`;

Run the tests:

```sh
bb test

# Or in watch mode.
bb test --watch
```

Lint the sources and tests:

```sh
bb lint

# ESLint will try to fix linting errors but be aware that not all of them can
# be fixed automatically.
bb lint --fix
```

And finally, to build:

```sh
bb build

# The previous command includes a lot of stuff that’s only needed during
# development and some of them require the toolbox to be installed. You
# need to set NODE_ENV to production to remove them:
bb build --production
```

## Creating an [Express][express] server

1. Navigate to the directory you want to create the project;
2. Run the command `bb scaffold-project express`;

The commands to *test*, *lint* and *build* are the same but this time, you can
also:

```sh
bb start
```

This command will start the server using [nodemon][nodemon] and any changes to
the files will restart the server.

## Creating a Single Page [React][react] Application

1. Navigate to the directory you want to create the project;
2. Run the command `bb scaffold-project react/spa`;

The commands to *test*, *lint* and *build* are the same but this time, you can
also:

```sh
bb serve
```

This command will spin up [Webpack’s Development Server][webpack-dev-server] to
serve your application on `localhost:9000`. Features included:

* [React Hot Loader][react-hot-loader] to enable hot reload of react components
  without losing state;
* Pretty error messages;

## More information

To see the available commands/flags you can find more information on our
[wiki][wiki] or type `--help` next to the command in question:

```sh
bb --help
bb build --help
bb test --help
# Etc...
```

## Contributors

Thanks goes to these wonderful people ([emoji legend][emoji-legend]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/11317458?v=4" width="100px;"/><br /><sub><b>Alexandre Borela</b></sub>](https://github.com/borela)<br />[💻](https://github.com/borela-tech/js-toolbox/commits?author=borela "Code") [🎨](#design-borela "Design") [📖](https://github.com/borela-tech/js-toolbox/commits?author=borela "Documentation") [👀](#review-borela "Reviewed Pull Requests") [⚠️](https://github.com/borela-tech/js-toolbox/commits?author=borela "Tests") | [<img src="https://avatars3.githubusercontent.com/u/41051393?v=4" width="100px;"/><br /><sub><b>Batarian711</b></sub>](https://github.com/Batarian711)<br />[🎨](#design-Batarian711 "Design") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

If you are not included but created bug reports, sent ideas or patches please
send a pull request to the `.all-contributorsrc` file.

[forks]: //github.com/borela-tech/js-toolbox/network/members
[issues]: //github.com/borela-tech/js-toolbox/issues
[pulls]: //github.com/borela-tech/js-toolbox/pulls
[stars]: //github.com/borela-tech/js-toolbox/stargazers
[watchers]: //github.com/borela-tech/js-toolbox/watchers
[wiki]: //github.com/borela-tech/js-toolbox/wiki

[babel]: //babeljs.io
[express]: //expressjs.com/
[flow]: //flow.org
[jsx]: //facebook.github.io/jsx/
[nodejs]: //nodejs.org
[nodemon]: //nodemon.io
[react]: //reactjs.org
[react-hot-loader]: //github.com/gaearon/react-hot-loader
[toolbox]: //github.com/borela-tech/js-toolbox
[typescript]: //www.typescriptlang.org
[webpack]: //webpack.js.org

[all-contributors]: //github.com/kentcdodds/all-contributors
[appveyor-build]: //ci.appveyor.com/project/borela/js-toolbox
[david-dm]: //david-dm.org/borela-tech/js-toolbox
[emoji-legend]: //github.com/kentcdodds/all-contributors#emoji-key
[experimental-plugins]: //babeljs.io/docs/en/plugins#experimental
[travis-build]: //travis-ci.org/borela-tech/js-toolbox
[webpack-dev-server]: //webpack.js.org/configuration/dev-server/
