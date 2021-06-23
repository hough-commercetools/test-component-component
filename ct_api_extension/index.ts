import { ExtensionInput, UpdateAction } from '@commercetools/platform-sdk'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getCartUpdates } from './cart'
import { ExtensionError } from './errors'
import intercept from '../shared/intercept'
import { Sentry } from '../shared/sentry'

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (!req.body || !req.body.action || !req.body.resource) {
    context.res = {
      status: 400,
      body: 'Invalid request',
    }
    return
  }

  intercept(context)

  try {
    const result = await handle(req.body)
    context.res = {
      body: result,
    }
  } catch (err) {
    if (err instanceof ExtensionError) {
      context.res = {
        status: err.status,
        body: {
          errors: [
            {
              code: err.code,
              message: err.message,
            },
          ],
        },
      }
      context.log.error(err)
      return
    }

    Sentry.captureException(err)
    await Sentry.flush(2000);
    
    throw err
  }
}

const handle = async ({ action, resource }: ExtensionInput) => {
  if (!resource.obj) {
    throw new ExtensionError('No resource or resource object given')
  }

  console.info(`Receive ${action} action for a ${resource.typeId}`)

  if (resource.typeId === 'cart') {
    return createUpdateRequest(...(await getCartUpdates(resource.obj)))
  }

  throw new ExtensionError(`Unsupported resource typeId '${resource.typeId}'`)
}

const createUpdateRequest = (...actions: UpdateAction[]) => ({
  responseType: 'UpdateRequest',
  actions: actions,
})

export default httpTrigger
