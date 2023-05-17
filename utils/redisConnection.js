const redis = require('redis');
const redisclient = redis.createClient();

(async () => {
  port = '127.0.0.1';
  host = 6379;
  await redisclient.connect(port, host);
})();

redisclient.on('ready', () => {
  console.log('Connected!');
});

redisclient.on('error', (err) => {
  console.log('Error in the Connection');
});

module.exports = redisclient;
