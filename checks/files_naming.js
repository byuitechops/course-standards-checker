const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger, course) => {

    function logFile() {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Filename': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.id,
        });
    }

    /* Checks:
        1. There are more than 2 underscores
        2. The filetype matches what is in the filename
        3. The course code is correct in the filename
    */

    // TODO Add a "Reason" section to the log, with why it is incorrect

    if (item.constructor.name !== 'File') {
        return;
    } else if ((item.display_name.match(/_/g) && item.display_name.match(/_/g).length) !== 2 ||
        fileType(item.display_name) !== item.display_name.split('_')[1] ||
        item.display_name.split('_')[0] !== course.course_code.replace(/\s/gi, '').toLowerCase()) {
        logFile();
    }
};

module.exports.details = {
    filename: 'item_template',
    title: 'Naming Conventions',
    description: 'These files do not meet the standard naming conventions. Each file should be named like this:  [coursecode]_[filetype]_[filename].[ext]',
    types: ['File']
};