const axios = require('axios');
const csv = require('csvtojson');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const githubURL = 'https://raw.githubusercontent.com/citartech/job-vacancies/master/assets/country-codes.txt';
const backupPath = 'data/country-codes.txt';

async function downloadData() {
  try {
    let response = await axios.get(githubURL);
    fs.writeFile(backupPath, response.data, function() {});
    return response.data;
  } catch (error) {
    console.log("Remote file unavailable!");
  };
};

async function getBackupData() {
  try {
    return await readFile(backupPath, 'utf8');
  } catch (error) {
    console.log("Backup file unavailable!");
  };
};

async function convertCSVtoJSON(csvString) {
  const options = {noheader: true, delimiter: "   ", headers: ['code', 'name']};
  let countries = await csv(options).fromString(csvString);

  // Removes useless entries (1st, 2nd and last lines from file).
  return countries.slice(2, -1);
};

async function getCountries() {
  let rawCSVData = await downloadData();
  if (!rawCSVData) { rawCSVData = await getBackupData(); };

  return await convertCSVtoJSON(rawCSVData);
};

module.exports = {
  getAll: async function() {
    return await getCountries ();
  }
};
