import { Context } from '@azure/functions'
import trigger from './index'

const log = jest.fn()

// @ts-ignore
const context = {
  log: log,
  invocationId: 'ID',
  done: () => {},
  res: null,
} as Context

describe('trigger', () => {
  test('can call the trigger', async () => {
    const request = {
      body: {
        action: 'Create',
        resource: {
          typeId: 'cart',
          id: '22ce48b3-0156-47fc-b566-5dd513749e32',
          obj: {
            type: 'Cart',
            id: '22ce48b3-0156-47fc-b566-5dd513749e32',
            version: 1,
            lastMessageSequenceNumber: 1,
            createdAt: '2018-12-03T16:27:47.197Z',
            lastModifiedAt: '2018-12-03T16:27:47.197Z',
            lastModifiedBy: { clientId: 'jHLbJnEwycibBMB5SnxaYpAf' },
            createdBy: { clientId: 'jHLbJnEwycibBMB5SnxaYpAf' },
            anonymousId: '9338846',
            locale: 'en',
            country: 'GB',
            shippingAddress: { country: 'GB' },
          },
        },
      },
    }

    await trigger(context, request)
    expect(context.res?.body).toEqual({
      actions: [{
        action: 'setShippingMethod',
        shippingMethod: {
          typeId: "shipping-method",
          key: 'default-shipping',
        }
      }],
      responseType: 'UpdateRequest',
    })
  })
})
