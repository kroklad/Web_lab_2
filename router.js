const express = require('express');
const accountControllers = require('./controllers/accounts');

const router = express.Router();

router.get('/accounts', accountControllers.list);
router.post('/accounts', accountControllers.add);
router.put('/accounts', accountControllers.update);
router.delete('/accounts', accountControllers.delet);


module.exports = router;