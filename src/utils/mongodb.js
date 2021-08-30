const mongoose = require('mongoose');
const logger = require('./log4js').getLogger('mongodb');
const config = require('../config');

/**
 * 连接mongodb，获取mongo客户端实例
 * @returns
 */
module.exports = async () => {
  const processName = process.env.process_name || process.pid;

  try {
    const { mongodb } = config;
    const {
      host,
      port,
      dbName,
      authSource,
      user,
      password,
      reconnectTries = 10,
      reconnectInterval = 1000,
      poolSize = 10,
      autoIndex = false,
    } = mongodb;

    const client = await mongoose.connect(`mongodb://${host}:${port}`, {
      dbName,
      authSource,
      user,
      pass: password,
      autoReconnect: true,
      reconnectTries,
      reconnectInterval,
      poolSize,
      autoIndex,
      useNewUrlParser: true,
    });

    const { connection } = client;

    connection.on('disconnected', () => {
      logger.warn(`${processName} mongodb disconnected.`);
    });

    connection.on('error', err => {
      logger.error(`${processName} mongodb error.`, err);
    });

    connection.on('reconnected', () => {
      logger.info(`${processName} mongodb reconnected.`);
    });

    logger.info(`${processName} mongodb connected.`);

    return client;
  } catch (err) {
    logger.error(`${processName} mongodb failed.`, err);
  }
};
