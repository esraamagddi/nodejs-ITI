const router = require('express').Router();

router.use('/todos', require('./todoRoutes'));
router.use('/users', require('./userRoutes'));

module.exports = router;
