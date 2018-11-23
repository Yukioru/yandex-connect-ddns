const config = require('config');
const qs = require('query-string');

const BASE_URL = 'https://oauth.yandex.ru';
const DIR_URL = 'https://api.directory.yandex.net';
const AUTH_URL = `${BASE_URL}/authorize?${qs.stringify({
  response_type: 'code',
  client_id: config.get('client_id'),
})}`;
const TOKEN_URL = `${BASE_URL}/token`;
const ORG_URL = `${DIR_URL}/v6/organizations?fields=id,domains`;
const DOMAIN_URL = `${DIR_URL}/v6/domains`;

module.exports = {
  BASE_URL,
  AUTH_URL,
  TOKEN_URL,
  ORG_URL,
  DOMAIN_URL,
};
