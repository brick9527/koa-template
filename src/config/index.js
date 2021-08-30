const { load } = require('js-yaml');
const fs = require('fs');
const path = require('path');

const sampleConfig = require('./config.sample');
const mergeObject = require('../libs/merge_object');

/**
 * 获取本地配置文件与样板配置文件合并之后的配置
 * @returns {any}
 */
const getConfig = () => {
  const allowLocalConfigFileName = ['config.yml', 'config.yaml'];
  const localConfigFileFolder = path.join(__dirname, '../../');

  // 获取本地配置
  const localConfigFileName = allowLocalConfigFileName.find(fileName => {
    const configFilePath = path.join(localConfigFileFolder, fileName);
    return fs.existsSync(configFilePath);
  });
  if (!localConfigFileName) {
    return sampleConfig;
  }

  // 读取本地配置文件
  const localConfigFilePath = path.join(localConfigFileFolder, localConfigFileName);
  const localConfigData = fs.readFileSync(localConfigFilePath, { encoding: 'utf-8' });
  const localConfig = load(localConfigData) || {};
  return mergeObject(localConfig, sampleConfig);
};

module.exports = getConfig();
