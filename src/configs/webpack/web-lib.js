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

import shared from './shared'
import {getProjectName} from '../../util'
import {getSettings} from '../../settings'
import {join} from 'path'

let {minify} = getSettings()
const PROJECT_NAME = getProjectName()

export default function () {
  let config = shared()

  config.output = {
    ...config.output,
    filename: !minify
      ? `${PROJECT_NAME}.js`
      : `${PROJECT_NAME}.min.js`,
    library: PROJECT_NAME,
    libraryTarget: 'umd',
    path: join(config.output.path, 'web'),
  }

  config.target = 'web'
  return [config]
}