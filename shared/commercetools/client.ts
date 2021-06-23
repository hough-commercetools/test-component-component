import assert from 'assert'
import fetch from 'node-fetch'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { createClient } from '@commercetools/sdk-client'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/generated/client/by-project-key-request-builder'

const projectKey = process.env.CT_PROJECT_KEY

export interface ApiRoot extends ByProjectKeyRequestBuilder {}

assert(process.env.CT_API_URL, 'CT_API_URL missing')
assert(projectKey)

const getAuthMiddleware = () => {
  assert(process.env.CT_AUTH_URL, 'CT_AUTH_URL missing')
  assert(process.env.CT_SCOPES, 'CT_SCOPES missing')
  return createAuthMiddlewareForClientCredentialsFlow({
    host: process.env.CT_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: process.env.CT_CLIENT_ID,
      clientSecret: process.env.CT_CLIENT_SECRET,
    },
    scopes: process.env.CT_SCOPES.split(','),
    fetch,
  })
}

const httpMiddleware = createHttpMiddleware({
  host: process.env.CT_API_URL,
  enableRetry: true,
  retryConfig: {
    maxRetries: 2,
    retryDelay: 300,
    maxDelay: 5000,
  },
  fetch,
})

export const getApiRoot = () => {
  const authMiddleware = getAuthMiddleware()
  const server = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  /**
   * Create commercetools API request builder configured for the project configured with the
   * CT_PROJECT_KEY environment variable.
   */
  return createApiBuilderFromCtpClient(server).withProjectKey({ projectKey }) as ApiRoot
}
