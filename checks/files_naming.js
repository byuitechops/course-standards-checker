const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger, course) => {

    function logFile() {
        logger.log(`Does Not Meet Naming Conventions&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Filename': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.id,
        });
    }

    if (item.constructor.name !== 'File') {
        return;
    } else if ((item.display_name.match(/_/g) && item.display_name.match(/_/g).length) !== 2 ||
        fileType(item.display_name) !== item.display_name.split('_')[1] ||
        item.display_name.split('_')[0] !== course.courseDetails.course_code.replace(/\s/gi, '').toLowerCase()) {
        logFile();
    }

};