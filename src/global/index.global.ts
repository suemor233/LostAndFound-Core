import { config } from 'dotenv'

function registerEnv() {
  config()
}

export function register() {
  registerEnv()
}
