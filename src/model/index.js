const fs = require('fs');
const path = require('path');

/**
 * 加载当前目录下所有model.*.js,并根据名称生成对应model
 * @returns {any} Model集合
 */
function modelLoader () {
  // 获取当前目录下所有的文件名
  const modelFileList = fs.readdirSync(__dirname);

  // 遍历每个文件，筛选出model.*.js
  const modelFileRegExp = /^model\..+?\.js$/;
  return modelFileList
    .filter(fileName => modelFileRegExp.test(fileName))
    .reduce((total, fileName) => {
      const model = require(path.join(__dirname, fileName));
      if (!Object.keys(total).includes(model.modelName)) {
        total[model.modelName] = model;
      }
      return total;
    }, {});
};

module.exports = modelLoader();
