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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
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
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  retweet_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  like_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  reply_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  }
})
const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  follower_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
})


const Retweet = sequelize.define('Retweet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
})



const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
})


const Reply = sequelize.define('Reply', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reply_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  retweet_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  like_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  },
  reply_count: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  }
})

User.hasMany(Tweet, {
  foreignKey: "user_id",
  onDelete: 'cascade'
});
User.hasMany(Follow, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})
User.hasMany(Retweet, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})
Tweet.hasMany(Retweet, {
  foreignKey: 'tweet_id',
  onDelete: 'cascade'
})
User.hasMany(Like, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})
Tweet.hasMany(Like, {
  foreignKey: 'tweet_id',
  onDelete: 'cascade'
})
User.hasMany(Reply, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})
Reply.hasMany(Like, {
  foreignKey: 'reply_id',
  onDelete: 'cascade'
})
Reply.hasMany(Retweet, {
  foreignKey: 'reply_id',
  onDelete: 'cascade'
})

module.exports = {
    User,
    Tweet,
    Follow,
    Retweet,
    Like,
    Reply
}