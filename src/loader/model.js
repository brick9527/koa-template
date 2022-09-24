const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const logger = require('../utils/log4js').getLogger('model_loader');

function modelLoader () {
  const moduleFolderPath = path.join(__dirname, '../modules');
  const moduleFileList = fs.readdirSync(moduleFolderPath);

  const modelMap = moduleFileList.reduce((modelMap, moduleFileName) => {
    const modelPath = path.join(moduleFolderPath, moduleFileName, 'model');
    const configPath = path.join(moduleFolderPath, moduleFileName, 'config.json');
    const { model: modelConfig } = require(configPath);

    if (!fs.existsSync(modelPath)) {
      return modelMap;
    }

    // 且该文件是个文件夹
    const fileStat = fs.statSync(modelPath);
    if (!fileStat.isDirectory()) {
      return modelMap;
    }

    const modelGroup = _.get(modelConfig, 'group') || 'default';
    if (!modelMap[modelGroup]) {
      modelMap[modelGroup] = {};
    }

    const modelFileNameList = fs.readdirSync(modelPath);
    for (const modelFileName of modelFileNameList) {
      const modelFilePath = path.join(modelPath, modelFileName);
      const model = require(modelFilePath);
      logger.debug(`load model ${modelGroup}:${model.modelName}. path: ${modelFilePath}`);
      modelMap[modelGroup][model.modelName] = model;
    }

    return modelMap;
  }, {});

  return modelMap;
}

module.exports = modelLoader();
