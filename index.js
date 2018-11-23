const config = require('config');
const qs = require('query-string');
const find = require('lodash.find');
const { initDB, checkExpires } = require('./db');
const api = require('./api');

(async () => {
  const storage = await initDB('./db/data');
  const authorizeData = {
    client_id: config.get('client_id'),
    client_secret: config.get('client_secret'),
  };

  const tokenData = await storage.getItem('tokenData');
  if (tokenData) {
    const isExpired = checkExpires(tokenData);
    if (isExpired) {
      const newData = await api.getToken(qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: tokenData.refresh_token,
        ...authorizeData,
      }));
      newData.createdAt = Date.now();
      await storage.setItem('tokenData', newData);
    }

    let organization = await storage.getItem('organization');
    const domain = config.get('domain');
    if (organization.domain !== domain) organization = null;
    if (!organization) {
      const orgList = await api.getOrgList(tokenData.access_token);
      const orgData = find(orgList.result, {
        domains: {
          master: domain,
        },
      });
      const org = {
        id: orgData.id,
        domain: orgData.domains.master,
      };
      await storage.setItem('organization', org);
    } else {
      const domains = await api.getDomains(tokenData.access_token, organization.id);
      console.log(domains); // TODO: Ждём фикса 500 ошибки.
    }
  } else {
    const username = config.get('username');
    const password = config.get('password');
    if (!username || !password) return;

    const code = await api.auth(username, password, process.env.DEBUG === 'true');
    if (!code) return;

    const data = await api.getToken(qs.stringify({
      code,
      grant_type: 'authorization_code',
      ...authorizeData,
    }));
    data.createdAt = Date.now();
    await storage.setItem('tokenData', data);
  }
})();
