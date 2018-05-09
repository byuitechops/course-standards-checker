const canvas = require('canvas-api-wrapper');
const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger) => {

    function logFile(logCategory) {
        logger.log(`${item.constructor.name} | ${logCategory}`, {
            'Filename': item.display_name,
            'ID': item.id,
            'Size': `${Math.ceil(item.size / 1000)} MB`
        });
    }

    if (item.constructor.name !== 'File') {
        return;
    } else if (fileType(item.display_name) === 'video') {
        logFile('Video Files');
    } else if (fileType(item.display_name) === 'audio') {
        logFile('Audio Files');
    } else if (item.size > 15000) {
        logFile('Large Files');
    }

};