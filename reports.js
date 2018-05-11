const fs = require('fs');

module.exports = (logger, course) => {

    var scripts = fs.readdirSync('./checks').map(script => require(`./checks/${script}`));

    /* Set tag descriptions here */
    scripts.forEach((script, index) => {
        if (!script.details) {
            console.log(`Script #${index + 1} is missing it's details export.`);
            return;
        }
        script.details.types.forEach(type => {
            logger.setTagDescription(course.wrapTitle(script.details.title, type), script.details.description);
        });
    });

    var htmlHeader = `
        <div>Course Name: ${course.courseDetails.name}</div>
        <div>Course Code: ${course.courseDetails.course_code}</div>
        <div>Course ID: ${course.courseDetails.id}</div>
        <a target="_blank" href="https://byui.instructure.com/courses/${course.courseDetails.id}">https://byui.instructure.com/courses/${course.courseDetails.id}</a>
    `;

    logger.setHtmlHeader(htmlHeader);
    logger.reportTitle = `Standards Check - ${course.courseDetails.course_code}`;

    /* What tags are added to the LMS Team report */
    logger.createReportSet('LMS Team', [

    ]);

    /* What tags are added to the Review Team report */
    logger.createReportSet('Review Team', [

    ]);

    // logger.setTagDescription('File | Large Files', 'These are files that are over 15 MB in size.');
    // logger.setTagDescription('File | Video Files', 'These are video files saved in the course.');
    // logger.setTagDescription('File | Audio Files', 'These are audio files saved in the course.');
    // logger.setTagDescription('File | Does Not Meet Naming Conventions', 'These files do not meet the standard naming conventions. Each file should be named like this:  [coursecode]_[filetype]_[filename].[ext]');
    // logger.setTagDescription('Page | Missing Template', 'These pages did not receive their designated html template files.');
    // logger.setTagDescription('Universal | Item Not Deleted From Course', 'These items were supposed to be deleted from the course, but haven\'t been.');
    // logger.setTagDescription('Universal | No Associated Module Item', 'These items are not linked to a module item.');
    // logger.setTagDescription('Universal | Still Using Old Name', 'These items were not renamed as they were supposed to.');
    // logger.setTagDescription('Universal | Incorrect Published Setting', 'These items\' published settings should have been changed.');
    // logger.setTagDescription('ModuleItem | No Completion Requirements', 'These items do not have any completion requirements.');


    /* Generate the reports */
    logger.consoleReport();
    logger.jsonReport('./reports');
    logger.htmlReport('./reports');
};