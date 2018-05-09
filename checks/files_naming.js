const canvas = require('canvas-api-wrapper');
const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger) => {

    function logFile() {
        logger.log(`${item.constructor.name} | Does Not Meet Naming Conventions`, {
            'Filename': item.display_name,
            'ID': item.id,
        });
    }

    if (item.constructor.name !== 'File') {
        return;
    } else if ((item.display_name.match(/_/g) && item.display_name.match(/_/g).length) !== 2 ||
        fileType(item.display_name) !== item.display_name.split('_')[1]) {
        // ALSO NEED TO MATCH courseCode
        logFile();
    }

};