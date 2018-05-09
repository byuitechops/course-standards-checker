const canvas = require('canvas-api-wrapper');
const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger) => {

    function logFile(logCategory) {
        logger.log(`${item.constructor.name} | Does Not Meet Naming Conventions`, {
            'Filename': item.display_name,
            'ID': item.id,
        });
    }

    if (item.constructor.name !== 'File') {
        return;
    }



    if ()

};