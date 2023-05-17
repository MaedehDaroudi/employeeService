const boom = require("boom");
const redisData = require("../utils/redisConnection");

exports.dataService = async (req, res) => {
  console.log("=========================");
  const a1 = await redisData.getData("userData", 1);
  const a2 = await redisData.getData("userData", 2);
  console.log("🚀 ~~ a1=>", a1);
  console.log("🚀 ~~ a2=>", a2);

  let userData = await redisData.getData("userData", 2);
  console.log(
    "🚀 ~ file: rootController.js:7 ~ exports.dataService= ~ userData:",
    userData
  );
  userData = JSON.parse(userData);
  if (userData !== null) {
    const checkId = await userData.find(data => data.id === +req.body.id);
    if (checkId) {
      res.status(402).json({
        status: "fail",
        message: "شناسه ی دادهها تکراری است.",
      });
    } else {
      const checkParent = await userData.find(
        data => data.id === +req.body.parent
      );
      if (checkParent) {
        let userData2 = await redisData.getData("userData", 2);
        userData2 = JSON.parse(userData2);
        userData.push({ id: req.body.id, data: req.body.data });
        userData2.push({ id: req.body.id, parent: req.body.parent });
        redisData.saveData(["userData", "userData"], [userData, userData2]);
        // redisclient1.set("userData", JSON.stringify(userData));
        // redisclient2.set("userData", JSON.stringify(userData2));

        console.log("userData=>", await redisData.getData("userData", 1));
        console.log("userData2=>", await redisData.getData("userData", 2));

        res.status(200).json({
          status: "success",
          message: "داده ها ذخیره شد.",
        });
      } else {
        res.status(402).json({
          status: "fail",
          message: "امکان ثبت اطلاعات برای شما وجود ندارد.",
        });
      }
    }
  } else {
    userData = [];
    let userData2 = [];
    userData.push({ id: req.body.id, data: req.body.data });
    userData2.push({ id: req.body.id, parent: req.body.parent });
    redisData.saveData(["userData", "userData"], [userData, userData2]);
    res.status(200).json({
      status: "success",
      message: "داده ها ذخیره شد.",
    });
  }
  // res.end('Hello');
};

exports.getData = async (req, res) => {
  console.log("22222222222222222");
  let data1 = await redisData.getData("userData", 1);
  console.log(
    "🚀 ~ file: rootController.js:62 ~ exports.getData= ~ data1:",
    JSON.parse(data1)
  );
  let data2 = await redisData.getData("userData", 2);
  console.log(
    "🚀 ~ file: rootController.js:64 ~ exports.getData= ~ data2:",
    JSON.parse(data2)
  );
  res.writeHead(200, { "Content-Type": "application/json" });
  // res.write(JSON.stringify(data1));
  res.end(data1);
};
