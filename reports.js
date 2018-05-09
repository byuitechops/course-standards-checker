const moment = require('moment');

module.exports = (logger, courseID) => {

    var htmlHeader = `
    
    `;

    logger.setHtmlHeader(html);

    logger.createReportSet('LMS Team', [

    ]);

    logger.createReportSet('Review Team', [

    ]);

    title = `Course Standards Check - ${courseID}`;

    logger.consoleReport();
    logger.jsonReport('./reports');
    logger.htmlReport('./reports');
};