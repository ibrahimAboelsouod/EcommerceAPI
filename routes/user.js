const { verifyToken } = require('../middlewares/verifyToken');

const router = require('express').Router();


router.put('/:id', verifyToken)

module.exports = router;