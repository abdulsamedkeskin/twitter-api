const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'app.db'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: uuidv4()
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(8);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  },
);

User.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const Tweet = sequelize.define('Tweet', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: uuidv4()
  },
  user_id: DataTypes.STRING,
  content: DataTypes.STRING
})


sequelize.authenticate().then(e => {
    console.log("Connected to db")
    User.sync()
    Tweet.sync()
}).catch(err => {
    console.log(err)
})

module.exports = {
    User,
    Tweet
}