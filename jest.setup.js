process.env.BABEL_ENV = 'test' // Make sure to load the appropriate babel plugins
process.env.NODE_ENV = 'test' // set the proper node env
global.__DEV__ = false

// For async tests, catch all errors here so we don't have to try / catch
// everywhere for safety
process.on('unhandledRejection', (error) => {
  console.error(error)
})

process.env.ENVIRONMENT = 'test'
process.env.RELEASE = 'v1'
process.env.CT_PROJECT_KEY = 'nl-unittest'
process.env.CT_CLIENT_ID = 'foo'
process.env.CT_CLIENT_SECRET = 'foo'
process.env.CT_SCOPES = 'foo'
process.env.CT_API_URL = 'https://ct.localhost'
process.env.CT_AUTH_URL = 'https://ct.localhost'
process.env.COMPONENT_NAME = 'test-component'
process.env.DEFAULT_SHIPPING_METHOD_KEY = 'default-shipping'
