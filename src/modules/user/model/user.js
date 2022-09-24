const MongoBaseSchema = require('../../../model/mongo.base_schema');

const userSchema = new MongoBaseSchema({
  name: {
    type: String,
  },
});

module.exports = userSchema.createModel('User');
