// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import EVENTS_BUS from '../events-bus'
import STORE from '../state'
import webpack from 'webpack'
import webpackConfig from '../configs/webpack'
import {addFlags} from './flags'
import {onExitRequest} from '../utils'
import {setUpCommand} from './utils'

import {
  taskStarted,
  taskStopped,
  taskUpdated,
} from '../events'

import {
  BROWSERS,
  BUNDLE_STATS,
  COMMENT_FLOW,
  DISABLE_EXPERIMENTAL_PLUGINS,
  DISABLE_SOURCE_MAPS,
  INCLUDE_POLYFILLS,
  JSX,
  MINIFY,
  MINIFY_CSS,
  MINIFY_HTML,
  MINIFY_JS,
  NODE,
  PLATFORMS,
  PRODUCTION,
  PROGRESS,
  PROJECT_TYPE,
  REACT,
  REMOVE_FLOW,
  TYPE_SCRIPT,
  WATCH,
} from './flags'

function builder(yargs) {
  addFlags(yargs, [
    BROWSERS,
    BUNDLE_STATS,
    COMMENT_FLOW,
    DISABLE_EXPERIMENTAL_PLUGINS,
    DISABLE_SOURCE_MAPS,
    INCLUDE_POLYFILLS,
    JSX,
    MINIFY,
    MINIFY_CSS,
    MINIFY_HTML,
    MINIFY_JS,
    NODE,
    PLATFORMS,
    PRODUCTION,
    PROGRESS,
    PROJECT_TYPE,
    REACT,
    REMOVE_FLOW,
    TYPE_SCRIPT,
    WATCH,
  ])
}

function handler(args) {
  setUpCommand(STORE, EVENTS_BUS, 'build', args)

  console.log(STORE.getState())
  return

  EVENTS_BUS.publish(taskStarted({
    name: 'webpack',
    status: 'Preparing Webpack compiler...',
  }))

  const STATE = STORE.getState()
  const WEBPACK_CONFIG = webpackConfig(STATE)
  const COMPILER = webpack(WEBPACK_CONFIG)

  let {
    options: {watch},
  } = STATE

  if (watch) {
    EVENTS_BUS.publish(taskUpdated({
      name: 'webpack',
      status: 'Running Webpack in watch mode...',
    }))

    const WATCHER = COMPILER.watch(reportWatchBuild)

    onExitRequest(() => {
      WATCHER.close()
      EVENTS_BUS.publish(taskStopped({name: 'webpack'}))
    })

    return
  }

  EVENTS_BUS.publish(taskUpdated({
    name: 'webpack',
    status: 'Running Webpack...',
  }))

  COMPILER.run(reportBuild)
}

function reportBuild(error, stats) {
  if (error)
    throw error

  stats = stats.toJson('normal')
  // EVENTS_BUS.publish(built(stats))

  EVENTS_BUS.publish(taskStopped({name: 'webpack'}))
}

function reportWatchBuild(error, stats) {
  if (error)
    throw error

  stats = stats.toJson('normal')
  // EVENTS_BUS.publish(built(stats))
}

export default {
  command: 'build [dir]',
  description: 'Build using Webpack.',
  builder,
  handler,
}
