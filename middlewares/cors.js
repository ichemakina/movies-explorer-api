const allowedCors = [
  'http://localhost:3001',
  'http://ichemakina-movies.nomoredomainsmonster.ru',
  'https://ichemakina-movies.nomoredomainsmonster.ru',
];
const allowedMethods = 'GET, HEAD, PUT, PATCH, POST, DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
