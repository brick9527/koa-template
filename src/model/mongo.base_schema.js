const mongoose = require('mongoose');
const _ = require('lodash');

class MongoBaseSchema extends mongoose.Schema {
  constructor (schema, options = {}) {
    const timestampOptions = {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    };
    const opts = _.defaultsDeep(options, timestampOptions);
    super(schema, opts);

    // 注册中间件
    this._registerMiddleware();

    this.createModel = this.createModel.bind(this);
  }

  /**
   * 注册中间件
   */
  _registerMiddleware () {
    // 保存
    this.post('save', async function () {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    });

    // 更新
    this.post(/^update/, async function () {
      this.updatedAt = new Date();
    });
  }

  /**
   * 根据当前Schema创建Model
   * @param {String} modelName - 所要创建的Model的名字，建议使用大驼峰命名，数据库中表名也将用次名称
   * @returns {mongoose.Model}
   */
  createModel (modelName) {
    return mongoose.model(modelName, _.omit(this, ['model']), modelName);
  }
}

module.exports = MongoBaseSchema;
