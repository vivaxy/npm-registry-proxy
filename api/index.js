/**
 * @since 2019-09-30 02:11
 * @author vivaxy
 */
const { parse } = require('url');

function getCurrentCli(ua) {
  if (ua.includes('yarn')) {
    return 'yarn';
  }
  return 'npm';
}

module.exports = function(req, res) {
  const reqURL = parse(req.url);
  const [, targetCli, encodedRegistry, ...paths] = reqURL.path.split('/');
  let registry = decodeURIComponent(encodedRegistry);
  if (['npm', 'yarn'].includes(targetCli) && encodedRegistry && parse(registry).host) {
    const currentCli = getCurrentCli(req.headers['user-agent']);
    if (currentCli !== targetCli) {
      res.statusCode = 403;
      res.send(`Use ${targetCli} for installing.`);
    } else {
      if (!registry.endsWith('/')) {
        registry += '/';
      }
      res.statusCode = 302;
      res.setHeader('Location', registry + paths.join(paths));
      res.send(null);
    }
  } else {
    res.statusCode = 404;
    res.send('Hello World!');
  }
};
