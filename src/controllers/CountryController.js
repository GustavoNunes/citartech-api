var CountryService = require('../models/country/CountryService.js');

module.exports = {
  getAllAsJSON: async function (req, res) {
    return res.json(await CountryService.getAll());
  },
  getAllAsCSV: async function (req, res) {
    return res.download(await CountryService.getAllAsCSV());
  },
  getAllAsXLSX: async function (req, res) {
    return res.download(await CountryService.getAllAsXLSX());
  }
};
