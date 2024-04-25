const authorize = (req, res, next) => {
  /* an example of how an API key can be used. NOT PROPER FOR REAL USE
    Small example for now. */
  const { apiKey } = req.query;
  if (apiKey === 'ping') {
    console.log('access granted');

    // modifies the request object for the next response
    req.user = { name: 'John Doe', id: 123456 };
    next();
  } else {
    console.log('access denied');
    res.send({ results: [], status: 401, message: 'ACCESS Denied' });
    // next()
  }
};
module.exports = authorize;
