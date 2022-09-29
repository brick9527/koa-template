const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const logger = require('../utils/log4js').getLogger('controller_loader');

// TODO: 递归加载
function controllerLoader () {
  const moduleFolderPath = path.join(__dirname, '../modules');
  const moduleFileList = fs.readdirSync(moduleFolderPath);

  const controllerMap = moduleFileList.reduce((controllerMap, moduleFileName) => {
    const controllerPath = path.join(moduleFolderPath, moduleFileName, 'controller');
    const configPath = path.join(moduleFolderPath, moduleFileName, 'config.json');
    const { controller: controllerConfig } = require(configPath);

    if (!fs.existsSync(controllerPath)) {
      return controllerPath;
    }

    // 且该文件是个文件夹
    const fileStat = fs.statSync(controllerMap);
    if (!fileStat.isDirectory()) {
      return controllerMap;
    }

    const controllerGroup = _.get(controllerConfig, 'group') || moduleFileName;
    if (!controllerMap[controllerGroup]) {
      controllerMap[controllerGroup] = {};
    }

    const modelFileNameList = fs.readdirSync(controllerGroup);
    for (const modelFileName of modelFileNameList) {
      const controllerFilePath = path.join(controllerGroup, modelFileName);
      const controller = require(controllerFilePath);
      logger.debug(`load controller ${controllerGroup}:${modelFileName}. path: ${controllerFilePath}`);
      controllerMap[controllerGroup][modelFileName] = controller;
    }

    return controllerMap;
  }, {});

  return controllerMap;
}

module.exports = controllerLoader;
