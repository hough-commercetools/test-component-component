import { getCartUpdates } from './cart'
import * as cart from '../tests/files/cart-update.json'

describe('cart updates', () => {
  test('handles a cart update', async () => {
    // @ts-ignore
    const updates = await getCartUpdates(cart)
    expect(updates).toEqual([{
      action: 'setShippingMethod',
      shippingMethod: {
        typeId: "shipping-method",
        key: 'default-shipping',
      }
    }])
  })
})
