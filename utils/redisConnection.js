const redis = require("redis");

const host = 6379;
const port = "127.0.0.1";

const redisclient1 = redis.createClient();
const redisclient2 = redis.createClient({ db: 1 });

(async () => {
  await redisclient1.connect(port, host);
})();

(async () => {
  await redisclient2.connect(6380, host);
})();

redisclient1.on("ready", () => {
  console.log("Connected!");
});

redisclient2.on("ready", () => {
  console.log("Connected!");
});

redisclient1.on("error", err => {
  console.log("Error in the Connection");
});

redisclient2.on("error", err => {
  console.log("Error in the Connection");
});

exports.saveData = async ([key1, key2], [value1, value2]) => {
  console.log("🚀 ~~ key1:", key1);
  console.log("🚀 ~~ value1:", value1);
  console.log("🚀 ~~ key2:", key2);
  console.log("🚀 ~~ value2:", value2);
  redisclient1.set(key1, JSON.stringify(value1));
  redisclient2.set(key2, JSON.stringify(value2));
  console.log("1=>", await redisclient1.get("userData"));
  console.log("2=>", await redisclient2.get("userData"));
};

exports.getData = async (key, db) => {
  // console.log("1==>", await redisclient1.get("userData"));
  // console.log("2==>", await redisclient2.get("userData"));
  if (db === 1) return redisclient1.get(key);
  else if (db === 2) return redisclient2.get(key);
};
