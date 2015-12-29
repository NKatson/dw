var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    lowercase: true
  },
  state: mongoose.Schema.Types.Mixed,
});


UserSchema.statics.findOrCreate = function(uid, next) {
  this.findOne({ uid: uid }, (err, object) => {
		if (err) return next(err);
		if (object) return next(null, object);

    const user = new this({
      uid,
    });

    user.save(err => {
      if (err) return next(err);
      next(null, user);
    });
	});
}

UserSchema.statics.updateState = function(user, state, next) {
  user.state = Object.assign({}, user.state, state);
  user.save(err => {
    if (err) return next(err);
    next(null, user);
  });
}

module.exports = mongoose.model('User', UserSchema);
