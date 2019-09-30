/**
 * @since 2019-09-30 02:11
 * @author vivaxy
 */
const { URL } = require('url');

function getCurrentCli(ua) {
  if (ua.includes('yarn')) {
    return 'yarn';
  }
  return 'npm';
}

module.exports = function(req, res) {
  const reqURL = new URL(req.url);
  const [, targetCli, encodedRegistry, ...paths] = reqURL.path.split('/');
  if (targetCli && encodedRegistry) {
    const currentCli = getCurrentCli(req.headers['user-agent']);
    if (currentCli !== targetCli) {
      res.statusCode = 403;
      res.statusMessage = `Use ${targetCli} for installing.`;
    } else {
      res.statusCode = 302;
      let registry = decodeURIComponent(encodedRegistry);
      if (!registry.endsWith('/')) {
        registry += '/';
      }
      res.setHeader('Location', registry + paths.join(paths));
      res.send(null);
    }
  }
};
