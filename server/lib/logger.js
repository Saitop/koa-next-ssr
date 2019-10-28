const config = require("config");
const pino = require("pino");
const colada = require("pino-colada");
const os = require("os");
const miss = require("mississippi");

const serializers = {
  req: req => {
    return pino.stdSerializers.req(req);
  },
  res: pino.stdSerializers.res,
  err: pino.stdSerializers.err,
  error: pino.stdSerializers.err,
};

const opts = {
  level: config.get("env.logLevel"),
  serializers,
  base: {
    NODE_ENV: process.env.NODE_ENV,
    environment: config.get("env.enviroinment"),
    version: config.get("env.version"),
    pid: process.pid,
    hostname: os.hostname(),
  },
};

const stream =
  process.env.NODE_ENV === "production"
    ? pino.destination(1)
    : miss.pipeline(colada(), pino.destination(1));

const logger = pino(opts, stream);

module.exports = logger;
module.exports.serializers = serializers;
