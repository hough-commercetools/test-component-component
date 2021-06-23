import nock from 'nock'

export const ctAuthNock = () => {
  return ctNock()
    .filteringRequestBody(() => '*')
    .post('/oauth/token', '*')
    .reply(201, { token: 'your-token' })
    .persist()
}

export const ctNock = () => {
  /* Helper method to construct base nock which can be used
   * to create specific commercetools nocks
   */
  return nock('https://ct.localhost').defaultReplyHeaders({ 'Content-Type': 'application/json' })
}
