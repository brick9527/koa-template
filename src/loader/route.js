const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const logger = require('../utils/log4js').getLogger('route_loader');

/**
 * 格式化路由各个基础path值
 * @param {*} config - 配置
 * @param {Array<String>} base - 路由的基础path
 */
function _formatBase (config, base = []) {
  const { route = {} } = config;
  const { pathReplace = {}, toLowerCase = false } = route;
  let baseList = [...base];
  if (!_.isEmpty(pathReplace)) {
    for (const key in pathReplace) {
      const replaceValue = pathReplace[key];
      const keyRegExp = new RegExp(key, 'g');

      baseList = baseList.map(baseItem => {
        return baseItem.replace(keyRegExp, replaceValue);
      });
    }
  }

  if (toLowerCase) {
    baseList = baseList.map(baseItem => baseItem.toLowerCase());
  }

  return baseList;
}

/**
 * 递归加载路由
 * @param {koa.Router} router - router实例
 * @param {String} modulePath - 模块路径
 * @param {String} folderPath - (路由)文件夹路径
 * @param {Array<String>} base - 路由基础path值
 */
function _loadRoute (router, modulePath, folderPath, base = []) {
  const fileList = fs.readdirSync(folderPath);

  fileList.forEach(fileName => {
    const filePath = path.join(folderPath, fileName);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      const { name } = path.parse(filePath);
      // 加载配置文件
      try {
        const config = require(`${modulePath}/config.json`);
        const prefix = _.get(config, 'route.prefix');
        const routeBaseList = [prefix, ...base];
        if (name !== 'index') {
          routeBaseList.push(name);
        }
        const formattedRouteBase = _formatBase(config, routeBaseList);
        const routeBaseStr = formattedRouteBase.join('/');
        logger.debug(`load route. base: /${routeBaseStr}, file: ${filePath}`);
        require(filePath)(router, routeBaseStr);
      } catch (err) {
        logger.error(`load route failed. file: ${filePath}. ${err}`);
      }
    }

    if (fileStat.isDirectory()) {
      // 是一个文件夹, 继续递归
      const { name } = path.parse(filePath);
      if (name === 'index') {
        _loadRoute(router, modulePath, filePath, [...base]);
      } else {
        _loadRoute(router, modulePath, filePath, [...base, name]);
      }
    }
  });
}

module.exports = app => {
  const router = new Router();
  const moduleFolderPath = path.join(__dirname, '../modules');
  const moduleFileList = fs.readdirSync(moduleFolderPath);

  // 加载路由
  for (const fileName of moduleFileList) {
    const moduleItemFilePath = path.join(moduleFolderPath, fileName);
    const moduleItemFileList = fs.readdirSync(moduleItemFilePath);
    const { name } = path.parse(moduleItemFilePath);
    const existsRouteFileName = moduleItemFileList.find(moduleItemFileName => /^route/.test(moduleItemFileName));
    if (!existsRouteFileName) {
      logger.warn(`未找到路由文件, 跳过 ${moduleItemFilePath}`);
      continue;
    }

    const targetFilePath = path.join(moduleItemFilePath, existsRouteFileName);
    _loadRoute(router, moduleItemFilePath, targetFilePath, [name]);
  }

  app.use(router.routes())
    .use(router.allowedMethods());
};
