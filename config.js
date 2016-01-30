module.exports = {
  // set to your db path
  'database': 'mongodb://localhost/storefronts',
  // super secret for sessions
  'secret': 'iceblink luck',
  // allow CORS access to these urls
  'whitelist': [
    /^https?:\/\/localhost:(30|80)\d{2}\/?/,
    /^http(s)?:\/\/dogsghost.github.io\/?/
  ]
};
