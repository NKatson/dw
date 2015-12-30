import User from '../models/User';
import { Router } from 'express';

let router = Router();

/**
 * POST /state/create
 * Create state for user
 */
router.post('/create', (req, res, next) => {
const uid = req.cookies.uid || req.body.uid;
  if (!uid || uid.length === 0) return next('Error: uid is null');

  const state = req.body.state;
	const object = {
			uid,
      state,
		};

	User.findOrCreate(uid, (err, user) => {
		if (err) return res.status(400).send({message: err.message});
    User.updateState(user, object.state, ((err, user) => {
      if (err) return res.status(400).send({message: err.message});
      return res.status(200).send({ message: user.uid + ' has been updated successfully!' });
    }));
  });
 });

export default router;
