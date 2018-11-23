const fetch = require('node-fetch');
const { DOMAIN_URL } = require('../constants');

/**
 * Получение списка доменов
 * @param {string} accessToken
 * @param {number} orgId
 * @returns {object} Данные о доменах
 */
async function getDomains(accessToken, orgId) {
  const data = await fetch(DOMAIN_URL, {
    method: 'GET',
    headers: {
      'Authorization': `OAuth ${accessToken}`,
      'Accept': 'application/json',
      'X-Org-Id': orgId,
    },
  }).then(e => e.json());
  return data;
}

module.exports = getDomains;
