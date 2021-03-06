const redis = require("redis");

class Redis {
  constructor(config) {
    this.config = config;
    this.client = null;
    this.retry = false;
  }
  async connect() {
    this.client = redis.createClient({
      port: this.config.PORT,
      host: this.config.HOST,
      password: this.config.PASSWORD,
    });
    this.client.on("error", (err) => {
      console.error("Redis Error: ", err);
      if (!this.retry) {
        this.retry = true;
        console.log("Trying to reconnect to Redis...");
        setTimeout(this.connect, 10000);
      }
      throw err;
    });
    return new Promise((resolve, reject) => {
      this.client.on("connect", (err) => {
        if (err) return reject(err);
        console.log("Connected to Redis successfully.");
        resolve(true);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, val) => {
        if (err) return reject(err);
        resolve(val);
      });
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

const redis_client = new Redis({
  PORT: 6379,
  HOST: "redis",
  PASSWORD: process.env.REDIS_PASSWORD,
});

module.exports = redis_client;
