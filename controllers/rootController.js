const boom = require('boom');
const redisclient = require('../utils/redisConnection');

exports.dataService = async (req, res) => {
  let userData = await redisclient.get('userData');
  userData = JSON.parse(userData);
  if (userData !== null) {
    const checkId = await userData.find((data) => data.id === +req.body.id);
    if (checkId) {
      res.status(500).json({
        status: 'fail',
        message: 'شناسه ی دادهها تکراری است.',
      });
    } else {
      const checkParent = await userData.find(
        (data) => data.id === +req.body.parent
      );
      if (checkParent) {      
        userData.push(req.body);        
        redisclient.set('userData', JSON.stringify(userData));
        res.status(200).json({
          status: 'success',
          message: 'داده ها ذخیره شد.',
        });
      } else {
        res.status(500).json({
          status: 'fail',
          message: 'امکان ثبت اطلاعات برای شما وجود ندارد.',
        });
      }
    }
  } else userData = [];
  // res.end('Hello');
};
