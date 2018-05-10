const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger) => {

    function logFile(logCategory) {
        logger.log(`${logCategory}&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Filename': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.id,
            'Size': `${Math.round(item.size / 1000000)} MB | ${item.size} Bytes`
        });
    }

    if (item.constructor.name !== 'File') {
        return;
    } else if (fileType(item.display_name) === 'video') {
        logFile('Video Files');
    } else if (fileType(item.display_name) === 'audio') {
        logFile('Audio Files');
    } else if (item.size > 15000000) {
        logFile('Large Files');
    }
};

module.exports.details = {
    filename: 'files_large',
    title: 'Large Files',
    description: 'These are files that are over 15 MB in size.',
    types: ['File']
};