import * as _Sentry from '@sentry/node'
import { RewriteFrames, Transaction } from '@sentry/integrations'

_Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  enabled: process.env.SENTRY_DSN ? true : false,
  environment: process.env.ENVIRONMENT,
  release: process.env.RELEASE,
  integrations: [
    new RewriteFrames(),
    new Transaction(),
  ],
})

_Sentry.configureScope(function (scope) {
  scope.setTag('service_name', process.env.COMPONENT_NAME || '')
  scope.setTag('site', process.env.SITE || '')
})

export const Sentry = _Sentry
