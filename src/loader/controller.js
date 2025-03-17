const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const logger = require('../utils/log4js').getLogger('controller_loader');

function _getPureFileName (fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}

/**
 * 控制器加载器
 * @returns {Object}
 */
function controllerLoader () {
  const moduleFolderPath = path.join(__dirname, '../modules');
  const moduleFileList = fs.readdirSync(moduleFolderPath);

  const controllerMap = moduleFileList.reduce((controllerMap, moduleFileName) => {
    const controllerPath = path.join(moduleFolderPath, moduleFileName, 'controller');
    const configPath = path.join(moduleFolderPath, moduleFileName, 'config.json');
    const { controller: controllerConfig } = require(configPath);

    if (!fs.existsSync(controllerPath)) {
      return controllerMap;
    }

    // 该文件是个文件
    const fileStat = fs.statSync(controllerPath);
    if (!fileStat.isDirectory()) {
      return controllerMap;
    }

    const controllerGroup = _.get(controllerConfig, 'group') || moduleFileName;
    const controllerGroupDisplayName = `${controllerGroup}Controller`;
    if (!controllerMap[controllerGroupDisplayName]) {
      controllerMap[controllerGroupDisplayName] = {};
    }

    const controllerFileNameList = fs.readdirSync(controllerPath);
    for (const controllerFileName of controllerFileNameList) {
      const controllerFilePath = path.join(controllerPath, controllerFileName);
      const controllerFileStat = fs.statSync(controllerFilePath);
      if (controllerFileStat.isDirectory()) {
        continue;
      }

      const pureFileName = _getPureFileName(controllerFileName);
      const propertyName = pureFileName === 'index' ? 'default' : pureFileName;
      const controller = require(controllerFilePath);
      logger.debug(`load controller ${controllerGroupDisplayName}.${propertyName}. path: ${controllerFilePath}`);
      controllerMap[controllerGroupDisplayName][propertyName] = controller;
    }

    return controllerMap;
  }, {});

  return controllerMap;
}

module.exports = controllerLoader();
