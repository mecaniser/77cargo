import assert from 'node:assert/strict';
import test from 'node:test';
import { adminAccessError } from '../src/utils/adminAccessError.mjs';

test('503 diagnoses missing configuration only for explicit backend code', async () => {
  const response = Response.json({ detail: { code: 'ADMIN_AUTH_NOT_CONFIGURED' } }, { status: 503 });
  assert.match(await adminAccessError(response), /configure ADMIN_ACCESS_KEY_SHA256/);
});

for (const [name, body] of [
  ['generic JSON', { detail: { code: 'SERVICE_UNAVAILABLE' } }],
  ['string detail', { detail: 'Service unavailable' }],
  ['incorrect code location', { code: 'ADMIN_AUTH_NOT_CONFIGURED' }],
  ['empty object', {}],
  ['null response', null],
]) {
  test(`503 ${name} does not guess missing auth configuration`, async () => {
    const message = await adminAccessError(Response.json(body, { status: 503 }));
    assert.match(message, /check Railway service status and deployment logs/);
    assert.doesNotMatch(message, /configure ADMIN_ACCESS_KEY_SHA256/);
  });
}

for (const [name, body] of [['HTML proxy error', '<html>Unavailable</html>'], ['empty response', ''], ['malformed JSON', '{']]) {
  test(`503 ${name} retains service diagnosis rather than network or credential diagnosis`, async () => {
    const message = await adminAccessError(new Response(body, { status: 503 }));
    assert.match(message, /Admin service unavailable/);
    assert.doesNotMatch(message, /configure ADMIN_ACCESS_KEY_SHA256|Cannot reach/);
  });
}

for (const status of [401, 403]) {
  test(`${status} retains access-denied guidance`, async () => {
    assert.match(await adminAccessError(new Response('', { status })), /Access denied/);
  });
}

test('other HTTP errors do not trust a mismatched configuration code', async () => {
  const response = Response.json({ detail: { code: 'ADMIN_AUTH_NOT_CONFIGURED' } }, { status: 502 });
  assert.match(await adminAccessError(response), /Admin service unavailable/);
});
