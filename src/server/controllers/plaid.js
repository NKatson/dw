import { Router } from 'express';
import plaid from 'plaid';

let router = Router();

/**
 * GET /plaid/institutions
 */
router.get('/institutions', (req, res, next) => {
  plaid.getInstitutions(plaid.environments.tartan, (err, data) => {
    res.send(data);
  });
});

export default router;
