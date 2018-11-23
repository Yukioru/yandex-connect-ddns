const fetch = require('node-fetch');
const { ORG_URL } = require('../constants');

/**
 * Получение списка организаций
 * @param {string} accessToken
 * @returns {object} Данные о организациях
 */
async function getOrgList(accessToken) {
  const data = await fetch(ORG_URL, {
    method: 'GET',
    headers: {
      'Authorization': `OAuth ${accessToken}`,
      'Accept': 'application/json',
    },
  }).then(e => e.json());
  return data;
}

module.exports = getOrgList;
