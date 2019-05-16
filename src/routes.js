var router = require('express').Router();
var CountryController = require('./controllers/CountryController.js');

router.get('/countries', CountryController.getAllAsJSON);
router.get('/countries/csv', CountryController.getAllAsCSV);
router.get('/countries/xlsx', CountryController.getAllAsXLSX);

module.exports = router;
