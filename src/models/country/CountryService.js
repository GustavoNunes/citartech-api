const Excel = require('exceljs');
const CountryRepository = require('./CountryRepository.js');

const XLSXPath = 'data/country-codes.xlsx';
const CSVPath = 'data/country-codes.csv';

function addCompositeField(countries) {
  for (let country of countries) {
    country.composition = `(${country.code}) ${country.name.toUpperCase()}`;
  };
  return countries;
};

function sortByNameDesc(countries) {
  return countries.sort((a, b) => b.name.localeCompare(a.name));
};

function prepareDataFile(countries) {
  let workbook = new Excel.Workbook();
  let sheet = workbook.addWorksheet('Country Codes');
  sheet.columns = [
    { header: "Code", key: "code", width: 10 },
    { header: "Name", key: "name", width: 30 },
    { header: "Composition", key: "composition", width: 40 },
  ];
  sheet.addRows(countries);
  return workbook;
};

async function createXLSXFile(countries) {
  let workbook = prepareDataFile(countries);
  await workbook.xlsx.writeFile(XLSXPath);
  return XLSXPath;
};

async function createCSVFile(countries) {
  let workbook = prepareDataFile(countries);
  await workbook.csv.writeFile(CSVPath);
  return CSVPath;
};

async function getCountries() {
  let countries = await CountryRepository.getAll();
  return addCompositeField(sortByNameDesc(countries));
};

module.exports = {
  getAll: async function() {
    return await getCountries();
  },
  getAllAsXLSX: async function() {
    return await createXLSXFile(await getCountries());
  },
  getAllAsCSV: async function() {
    return await createCSVFile(await getCountries());
  }
};
