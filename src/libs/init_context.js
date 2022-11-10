const log4js = require('../utils/log4js');
const createMongoClient = require('../utils/mongodb');
const createRedisClient = require('../utils/redis');
const config = require('../config');
const model = require('../loader/model');
const controller = require('../loader/controller');

/**
 * 初始化上下文属性
 * @param {Koa.Context} ctx - 上下文
 * @returns {any} ctx - 上下文
 * @property {any} ctx.config - 配置
 * @property {any} ctx.mongo - mongo客户端
 * @property {any} ctx.redisClient - redis客户端
 * @property {any} ctx.logger - 日志实例
 * @property {any} ctx.model - mongo model
 */
module.exports = async ctx => {
  ctx.config = config;
  ctx.logger = log4js.getLogger(process.env.process_name || 'default');
  ctx.mongoClient = await createMongoClient();
  ctx.redisClient = await createRedisClient();
  ctx.model = model;
  ctx.controller = controller;
};
