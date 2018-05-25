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

import basicNodePreset from "./target/node"
import basicPreset from "./target/both"
import basicWebPreset from "./target/web"
import {findModule} from "../../modules"

module.exports = function() {
  // There’s no way to pass the preset settings when using the CLI, so we are
  // using the environment variables passed to the “runBinary()” function.
  let {
    commentFlow = false,
    flow = false,
    production = false,
    react = false,
    removeFlow = false,
    target = false,
    typescript = false
  } = process.env

  // Select the basic preset.
  let result = basicPreset()
  if (target === "node") result = basicNodePreset()
  if (target === "web") result = basicWebPreset()

  console.log(commentFlow, flow, production, react, removeFlow, target, typescript)

  // Comment Flow annotations.
  if (commentFlow) {
    console.log(commentFlow)
    console.log("aaaaaaaaaaaaaaaaaa")
    result.plugins.unshift(findModule("@babel/plugin-transform-flow-comments"))
  }

  // Remove Flow annotations if they are not being commented already.
  if (removeFlow && !commentFlow)
    result.plugins.unshift(
      findModule("@babel/plugin-transform-flow-strip-types")
    )

  if (flow || commentFlow || removeFlow)
    result.plugins.unshift(findModule("@babel/plugin-syntax-flow"))

  // Enable JSX for React.
  if (react) {
    result.plugins.push(findModule("@babel/plugin-syntax-jsx"))
    result.plugins.push(findModule("@babel/plugin-transform-react-jsx"))
    result.plugins.push(
      findModule("@babel/plugin-transform-react-display-name")
    )

    if (!production) {
      result.plugins.push(findModule("@babel/plugin-transform-react-jsx-self"))
      result.plugins.push(
        findModule("@babel/plugin-transform-react-jsx-source")
      )
    }
  }

  // Add TypeScript support.
  if (typescript)
    result.plugins.push(findModule("@babel/plugin-transform-typescript"))

  return result
}

console.log(module.exports())