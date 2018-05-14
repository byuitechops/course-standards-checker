const fileType = require('../misc_scripts/fileType.js');

var validFiles = [
    '-Setup Notes & Course Settings',
    'courseBanner.jpg',
    'dashboard.jpg',
    'homeImage.jpg'
];

module.exports = (item, logger, course) => {

    var documentsFolder = course.folders.find(folder => folder.name === 'documents');

    function logFile(reason) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Filename': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.id,
            'Reason': reason
        });
    }

    /* Checks:
        1. There are more than 2 underscores
        2. The filetype matches what is in the filename
        3. The course code is correct in the filename
    */

    if (item.constructor.name !== 'File' || validFiles.includes(item.display_name)) {
        return;
    } else if ((item.display_name.match(/_/g) && item.display_name.match(/_/g).length) > 2) {
        // Too many underscores
        logFile('Filename contains extra underscores. They should only be used to divide the coursecode, filetype, and filename.');
    } else if ((item.display_name.match(/_/g) && item.display_name.match(/_/g).length) < 2) {
        // Not enough underscores
        logFile('Filename does not have all of the required fields: coursecode_filetype_filename.ext');
    } else if (fileType(item.display_name) !== item.display_name.split('_')[1] &&
        (documentsFolder && item.folder_id === documentsFolder.id)) {
        // Wrong filetype
        logFile('The filetype does not match the file\'s extension type.');
    } else if (item.display_name.split('_')[0] !== course.course_code.replace(/\s/gi, '').toLowerCase().split(':')[0]) {
        logFile('The course code on the file does not match the course.');
    }
};

module.exports.details = {
    filename: 'item_template',
    title: 'Naming Conventions',
    description: 'These files do not meet the standard naming conventions. Each file should be named like this:  [coursecode]_[filetype]_[filename].[ext]',
    types: ['File']
};