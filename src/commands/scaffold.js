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

function handler(args) {
  let {dir, ...options} = args

  store.dispatch(commandSet('scaffold'))
  store.dispatch(targetDirectorySet(dir))

  loadConfig()
  console.log(store.getState())
}

export default {
  command: 'scaffold <template> [dir]',
  description: 'Copy the template to the directory.',
  handler,
}
