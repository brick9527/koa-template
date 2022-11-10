const MongoBaseSchema = require('../../../libs/base_schema');

const userSchema = new MongoBaseSchema({
  name: {
    type: String,
  },
  test: {
    type: String,
    uniq: true,
  },
  mmmm: {
    type: String,
    index: true,
  },
});

module.exports = userSchema.createModel('User');
