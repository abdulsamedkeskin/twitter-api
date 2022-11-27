const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'app.db'
});

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
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


sequelize.authenticate().then(err => {
    console.log("Connected to db")
    User.sync()
}).catch(err => {
    console.log(err)
})

module.exports = {
    User
}