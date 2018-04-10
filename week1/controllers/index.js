var router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index.ejs');
});

router.get('/buildings/:name', (req, res) => {
	models.getBuildingDetail(req, res, req.params.name);
});

module.exports = router;
