const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'app.db',
    logging: false
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  user_id: DataTypes.UUID,
  content: DataTypes.STRING
})

const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  user_id: DataTypes.UUID,
  follower_id: DataTypes.UUID
})

sequelize.authenticate().then(e => {
    console.log("Connected to db")
  }).catch(err => {
    console.log(err)
})

module.exports = {
    User,
    Tweet,
    Follow
}