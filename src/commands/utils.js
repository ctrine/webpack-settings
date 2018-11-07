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

import store from '../state'
import {loadConfig} from '../configs/borela'

import {
  commandSet,
  optionsSet,
  projectTypeSet,
  targetDirectorySet,
} from '../state/events'

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function nodeEnvIsProduction() {
  let {NODE_ENV} = process.env
  return isString(NODE_ENV)
    ? NODE_ENV === 'production'
    : false
}

export function prepareCommand(command, args) {
  let {
    dir,
    projectType,
    production,
    ...options
  } = args

  if (!nodeEnvIsProduction()) {
    if (production)
      process.env.NODE_ENV = 'production'
  } else
    options.production = true

  store.dispatch(commandSet(command))
  store.dispatch(targetDirectorySet(dir))

  loadConfig()

  if (projectType)
    store.dispatch(projectTypeSet(projectType))

  store.dispatch(optionsSet(options))
}