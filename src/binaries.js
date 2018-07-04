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

import {existsSync} from 'fs'
import {join} from 'path'
import {noFalsyProps} from './util'
import {PACKAGE_DIR, BIN_DIR} from './paths'
import {spawnSync} from 'child_process'

/**
 * Checks if the binary exists or crash.
 */
export function assertBinaryExists(targetBinary:string) {
  if (!existsSync(getBinaryPath(targetBinary)))
    throw new Error(`Binary “${targetBinary}” not found.`)
}

/**
 * Get the target binary’s path.
 */
export function getBinaryPath(targetBinary:string) {
  const BIN = join(BIN_DIR, targetBinary)
  return process.platform === 'win32' ? `${BIN}.cmd` : BIN
}

/**
 * Find the binary and run it with the parent IO attached to it.
 */
export function runBin(targetBinary:string, args:string[], env?:Object) {
  const FOUND_BINARY = getBinaryPath(targetBinary)
  return spawnSync(FOUND_BINARY, args, {
    cwd: PACKAGE_DIR,
    env: noFalsyProps(env),
    stdio: 'inherit',
  })
}

/**
 * Find the binary and run it.
 */
export function runBinPiped(targetBinary:string, args:string[], env?:Object) {
  const FOUND_BINARY = getBinaryPath(targetBinary)
  return spawnSync(FOUND_BINARY, args, {
    cwd: PACKAGE_DIR,
    env: noFalsyProps(env),
  })
}
