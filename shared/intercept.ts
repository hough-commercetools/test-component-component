import { Context } from "@azure/functions"
import { Sentry } from "./sentry"

const methods = ['log', 'info', 'warn', 'error']

const sentryLevels = new Map([
  ['warn', Sentry.Severity.Warning],
  ['error', Sentry.Severity.Error],
])

const higherOrderLog = (method: string, context: Context) => {
  // @ts-ignore
  const logFn = (...params) => {
    // @ts-ignore
    if (context[method]) {
      // @ts-ignore
      context[method](...params)
    // @ts-ignore
    } else if (context.log[method]) {
      //Must check context.log for some of the methods (currently warn, info, error)
      // @ts-ignore
      context.log[method](...params)
    }

    if (sentryLevels.has(method)) {
      Sentry.captureMessage(params[0], sentryLevels.get(method))
      // Sentry.flush(2000).then(() => {})
    }
  }
  // @ts-ignore
  console[method] = logFn
}

export default (context: any) => methods.forEach((m) => higherOrderLog(m, context))
