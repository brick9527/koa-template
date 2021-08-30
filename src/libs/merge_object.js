const _ = require('lodash');

/**
 * 合并配置，以sampleObj为模板，合并targetObj的配置
 * 如果targetObj中存在的属性，以targetObj属性为主
 * 如果targteConfig中不存在的属性，以sampleObj属性为主
 * @param {any} targetObj - 目标配置
 * @param {any} sampleObj - 模板配置
 * @returns {any} config
 * @example
 * targetObj = { a: 1 }
 * sampleObj = { a: 2, b: 3 }
 * ==> config = { a: 1, b: 3 }
 */
module.exports = (targetObj, sampleObj) => {
  const targetObjCopy = _.cloneDeep(targetObj);
  const config = _.defaultsDeep(targetObjCopy, sampleObj);
  return config;
};
