import User from '../models/User';
import { Router } from 'express';

let router = Router();

/**
 * POST /state/create
 * Create state for user
 */
router.post('/create', (req, res, next) => {
  const uid = req.cookies.uid;
  //const uid = 'anastacia160592@gmail.com';
  const state = req.body.state;
	const object = {
			uid,
      state,
		};

	User.createOrUpdate(object, (err, user) => {
		if (err) {
			return res.status(400).send({message: err.message});
		}
		return res.send({ message: user.uid + ' has been added successfully!' });
	});
 });

export default router;
