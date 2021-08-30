const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const logger = require('../utils/log4js').getLogger();

/**
 * 路由加载器。加载/src/routes下所有文件
 * @param {any} app - Koa.app
 */
module.exports = app => {
  const router = new Router();
  const routeFilePath = path.join(__dirname, '../routes');
  const routeFiles = fs.readdirSync(routeFilePath);

  // 加载路由
  routeFiles.forEach(fileName => {
    const base = path.parse(fileName).name;
    logger.info(`load router: ${fileName} base: ${base}`);
    require(path.join(routeFilePath, fileName))(router, base);
  });

  app.use(router.routes())
    .use(router.allowedMethods());
};
