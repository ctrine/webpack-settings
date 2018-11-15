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

import {loadConfig} from '../configs/borela'
import {nodeEnvIsProduction} from '../utils'

import {
  commandSet,
  optionsSet,
  projectTypeSet,
  targetDirectorySet,
} from '../events'

/**
 * Initialize the command by normalizing and environment, loading settings and
 * updating the store based on the options passed directly to the CLI.
 *
 * @param store
 * Store that holds the CLI’s state.
 */
export function setUpCommand(
  store,
  eventsBus,
  command:string,
  args:Object
) {
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

  eventsBus.publish(commandSet(command))
  eventsBus.publish(targetDirectorySet(dir))

  loadConfig(store, eventsBus)

  if (projectType)
    eventsBus.publish(projectTypeSet(projectType))

  eventsBus.publish(optionsSet(options))
}
