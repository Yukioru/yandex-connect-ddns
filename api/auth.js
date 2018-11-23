const puppeteer = require('puppeteer');
const { AUTH_URL } = require('../constants');

/**
 * Авторизация на Яндекс
 * @param {string} username
 * @param {string} password
 * @param {boolean} debug
 * @returns {string} Код авторизации
 */
async function yaAuth(username, password, debug = false) {
  try {
    const browser = await puppeteer.launch({ headless: !debug });;
    const page = await browser.newPage();
    await page.goto(AUTH_URL);

    await page.type("input[type='text'][name='login']", username);

    const isPasswd = await page.evaluate(() => {
      const pwd = document.querySelector('input.passport-Input-Controller');
      return !!pwd;
    });
    if (!isPasswd) {
      // Переход на второй шаг
      await page.click("button[type='submit']");
      await page.waitForNavigation();
    }
    // Заполнение пароля
    await page.type("input[name='passwd']", password);
    await page.click("button[type='submit']");
    await page.waitForNavigation();
    await page.waitFor(500);

    // Проверка на рекламные предложения
    const isAds = await page.evaluate(() => {
      const skipEmailBtn = !!document.querySelector('.request-email_back-button > button');
      const skipPhoneBtn = !!document.querySelector('.request-phone_back-button > button');
      return !!(skipEmailBtn || skipPhoneBtn);
    });
    if (isAds) {
      await page.click("button[type='button']");
      await page.waitForNavigation();
    } else {
      await page.waitFor(500);
    }

    // Разрешение доступа приложения
    const isAcceptable = await page.evaluate(() => {
      const accept = document.querySelector('.submit-once_allow > button#nb-2');
      return !!accept;
    });
    if (isAcceptable) {
      await page.click('button#nb-2');
      await page.waitForNavigation();
    } else {
      await page.waitFor(500);
    }

    // Получение кода авторизации
    const code = await page.evaluate(() => (
      document.querySelector('.verification-code-code').innerText
    ));
    await browser.close();
    return code;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = yaAuth;
