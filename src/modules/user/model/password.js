const MongoBaseSchema = require('../../../libs/base_schema');

const userSchema = new MongoBaseSchema({
  name: {
    type: String,
  },
});

module.exports = userSchema.createModel('Password');
