import { Context } from '@azure/functions';
import  trigger from './index'

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
        query: { name: 'Bill' }
    };
    
    await trigger(context , request)

    expect(log.mock.calls.length).toBe(1);
    expect(context.res?.body).toContain('Hello, Bill');
  })
})