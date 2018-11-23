const fetch = require('node-fetch');
const { TOKEN_URL } = require('../constants');

/**
 * Получение токена
 * @param {string} body
 * @returns {object} Данные токена
 */
async function getToken(body) {
  const data = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  }).then(e => e.json());
  return data;
}

module.exports = getToken;
