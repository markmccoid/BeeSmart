const router = require('express').Router();
const wordListRouter = require('./wordListRouter');

router.use('/api', wordListRouter);
module.exports = router;
