/** ********************************************************************************************************************
 For all the json reports in the reports folder of this repo, read them all and stick them into one giant csv.
 To run, type 'node reportWrapper.js' and it will grab all the json files currently residing in the reports folder 
 of this repo. Be sure to run npm start and generate the reports before using this. 
***********************************************************************************************************************/
const fs = require('fs');
const path = require('path');
const d3 = require('d3-dsv');

// Get all the files in the report directory
let files = fs.readdirSync(path.resolve('./reports'), {encoding: 'utf8'})

// Get only the JSON files
files = files.filter(file => file.includes('.json'));

/** ******************************************************************************************************
 loop through the files, read in each one, parse it as JSON, then flatten the guts of each file 
 object's "data" property by creating a key on the main object for each key in the nested "data" object.
*********************************************************************************************************/
files = files.reduce((acc, file) => {
    let guts = fs.readFileSync(path.resolve(`./reports/${file}`), {encoding: 'utf8'});
    guts = JSON.parse(guts);
    guts = guts.map(gut => {
        let keys = Object.keys(gut.data);
        keys.forEach(key => {
            gut[key] = gut.data[key];
        });
        delete gut.data;
        return gut;
    })
    return acc.concat(guts);
}, []);

// write the full report
fs.writeFileSync(path.resolve('./finalReport.csv'), d3.csvFormat(files), 'utf8')
