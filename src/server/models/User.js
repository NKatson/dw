var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    lowercase: true
  },
  state: mongoose.Schema.Types.Mixed,
});


UserSchema.statics.findOneByUid = function(uid, next) {
  this.findOne({ uid: uid }, (err, user) => {
		if (err) return next(err);

		if (!user) {
			return next({ message: 'User not found.' });
		}
		next(null, user);
	});
}

UserSchema.statics.createOrUpdate = function(object, next) {
  this.update({ uid: { $eq: object.uid } }, object, { upsert: true }, next);
}

module.exports = mongoose.model('User', UserSchema);
