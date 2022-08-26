import 'zx-cjs/globals'
import dotenv from 'dotenv';
function registerEnv() {
  dotenv.config()
}

export function register() {
  registerEnv()
}
