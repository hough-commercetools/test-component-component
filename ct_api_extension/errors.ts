export class ExtensionError extends Error {
  status: number
  code: string

  constructor(err: string | Error, status?: number, code?: string) {
    super(err instanceof Error ? err.message : err)
    this.status = status || 500
    this.code = code || 'ExtensionBadResponse'

    if (err instanceof Error) {
      this.stack = [this.stack || '', 'Original error: ' + err.stack].join('\n')
    }
  }
}

export class ExtensionValidationError extends ExtensionError {
  constructor(err: string, code?: string) {
    super(err, 400, code || 'InvalidInput')
  }
}
