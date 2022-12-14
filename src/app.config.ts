import { argv } from 'zx-cjs'

import { isDev } from './global/env.global'

export const PORT = 2349
export const API_VERSION = 2

export const CROSS_DOMAIN = {
  allowedOrigins: ['suemor.com', 'localhost', '127.0.0.1', '.*dev'],
}

export const MONGO_DB = {
  dbName: 'LostAndFound',
  host: argv.db_host || '127.0.0.1',
  port: 27017,
  get uri() {
    return `mongodb://${this.host}:${this.port}/${this.dbName}`
  },
}

export const REDIS = {
  host: 'localhost',
  port: 6379,
  password: null,
  ttl: null,
  httpCacheTTL: 5,
  max: 5,
  disableApiCache: isDev && !process.env['ENABLE_CACHE_DEBUG'],
}

export const AXIOS_CONFIG = {
  timeout: 10000,
}

export const SECURITY = {
  jwtSecret: 'suemor',
  jwtExpire: '7d',
}

export const WX_SECRET = {
  appId: argv.app_id || process.env.APP_ID,
  AppSecret: argv.app_secret || process.env.APP_SECRET,
}

export const QINIU_SECRET = {
  qn_ak: argv.qn_ak || process.env.QN_AK,
  qn_sk: argv.qn_sk || process.env.QN_SK,
  qn_scope: argv.qn_scope || process.env.QN_SCOPE,
  qn_host: argv.qn_host || process.env.QN_HOST,
}
