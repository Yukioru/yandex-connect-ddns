const storage = require('node-persist');

/**
 * Инициализация базы
 * @param {string} dbPath
 * @returns {object} storage module
 */
async function initDB(dbPath) {
  await storage.init({
    dir: dbPath,
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
  });

  return storage;
}

/**
 * Проверка срока годности
 * @param {object} tokenData
 * @returns {boolean} Истёк ли срок
 */
function checkExpires(tokenData) {
  const currentTime = Date.now();
  const expireTime = tokenData.expires_in * 1000;
  const leftTime = tokenData.createdAt + expireTime - 86400000;
  return currentTime > leftTime;
}

module.exports = {
  initDB,
  checkExpires,
};
