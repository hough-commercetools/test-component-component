
import { Cart, CartUpdateAction } from '@commercetools/platform-sdk'

export const getCartUpdates = async (cart: Cart): Promise<CartUpdateAction[]> => {
  // throw new ExtensionValidationError("Something wrong with the input")
  return [{
    action: 'setShippingMethod',
    shippingMethod: {
      typeId: 'shipping-method',
      key: process.env.DEFAULT_SHIPPING_METHOD_KEY || 'default-shipping',
    }
  }]
}
