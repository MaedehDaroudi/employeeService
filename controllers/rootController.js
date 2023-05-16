const redis = require('redis');
exports.dataService =async (req, res) => {
  // const redis = require('redis');
  const redisclient = redis.createClient();

  (async () => {
    port = '127.0.0.1';
    host = 6379;
    await redisclient.connect(port, host);
  })();

  console.log('Connecting to the Redis');

  redisclient.on('ready', () => {
    console.log('Connected!');
  });
  redisclient.set('name', 'Flavio');
  const value =await redisclient.get('name');
  console.log('value: ', value);

  redisclient.on('error', (err) => {
    console.log('Error in the Connection');
  });
  // console.log('req.body =>', req.body);

  res.end('Hello');
};
