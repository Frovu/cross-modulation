const router = require('express').Router();

router.get('/', (req, res) => {
	return res.sendStatus(501);
});

module.exports = router;
