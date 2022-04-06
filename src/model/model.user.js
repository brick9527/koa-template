const BaseSchema = require('../libs/base_schema');

const userSchema = new BaseSchema({
  name: {
    type: String,
  },
});

module.exports = userSchema.createModel('User');
