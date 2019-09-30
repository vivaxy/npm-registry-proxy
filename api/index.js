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

function redirect(res, registry, paths) {
  if (!registry.endsWith('/')) {
    registry += '/';
  }
  const redirectURL = registry + paths.join('/');
  console.log('redirectURL', redirectURL);
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.statusCode = 307;
  res.setHeader('Location', redirectURL);
  res.end(null);
}

module.exports = function(req, res) {
  const { method, url, headers } = req;
  const reqURL = parse(url);
  const [, targetCli, encodedRegistry, ...paths] = reqURL.path.split('/');
  const registry = decodeURIComponent(encodedRegistry);
  const currentCli = getCurrentCli(headers['user-agent']);
  if (
    ['npm', 'yarn'].includes(targetCli) &&
    encodedRegistry &&
    parse(registry).host
  ) {
    if (method === 'GET') {
      // handle install
      if (currentCli !== targetCli) {
        res.statusCode = 403;
        res.end(`Use ${targetCli} for installing.`);
      } else {
        redirect(res, registry, paths);
      }
    } else {
      res.statusCode = 405;
      res.end(`Not Supported.`);
    }
  } else {
    res.statusCode = 404;
    res.end(null);
  }
};
