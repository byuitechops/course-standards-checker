const fs = require('fs');

module.exports = (logger, courseDetails) => {

    var checkScripts = fs.readdirSync('./checks');

    var checkScriptDetails = checkScripts.map(checkScript => require(`./checks/${checkScript}`).details);

    /* Set tag descriptions here */
    checkScriptDetails.forEach(checkScriptInfo => {
        console.log(checkScriptInfo);
        checkScriptInfo.types.forEach(type => {
            logger.setTagDescription(`${checkScriptInfo.title}&nbsp;<span style="color:#aaa">[${type}]</span>&nbsp;`, checkScriptInfo.description);
        });
    });

    var htmlHeader = `
        <div>Course Name: ${courseDetails.name}</div>
        <div>Course Code: ${courseDetails.course_code}</div>
        <div>Course ID: ${courseDetails.id}</div>
        <a target="_blank" href="https://byui.instructure.com/courses/${courseDetails.id}">https://byui.instructure.com/courses/${courseDetails.id}</a>
    `;

    logger.setHtmlHeader(htmlHeader);
    logger.reportTitle = `Standards Check - ${courseDetails.course_code}`;

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