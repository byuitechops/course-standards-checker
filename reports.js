module.exports = (logger, courseObject) => {

    var htmlHeader = `
        <div>Course Name: ${courseObject.name}</div>
        <div>Course Code: ${courseObject.course_code}</div>
        <div>Course ID: ${courseObject.id}</div>
        <a target="_blank" href="https://byui.instructure.com/courses/${courseObject.id}">https://byui.instructure.com/courses/${courseObject.id}</a>
    `;

    logger.setHtmlHeader(htmlHeader);

    /* What tags are added to the LMS Team report */
    logger.createReportSet('LMS Team', [

    ]);

    /* What tags are added to the Review Team report */
    logger.createReportSet('Review Team', [

    ]);

    /* Set tag descriptions here */
    logger.setTagDescription('File | Large Files', 'These are files that are over 15 MB in size.');
    logger.setTagDescription('File | Video Files', 'These are video files saved in the course.');
    logger.setTagDescription('File | Audio Files', 'These are audio files saved in the course.');
    logger.setTagDescription('File | Does Not Meet Naming Conventions', 'These files do not meet the standard naming conventions. Each file should be named like this:  [coursecode]_[filetype]_[filename].[ext]');


    /* Generate the reports */
    logger.consoleReport();
    logger.jsonReport('./reports');
    logger.htmlReport('./reports');
};