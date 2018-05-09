const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {

    /* Files that should have been deleted on conversion */
    var assignmentsDeleted = [
        /\[co~\d*\]/i //delete Course Outcomes assignments
    ];

    var discussionsDeleted = [
        /questions?\s*(and|&)\s*conversations?/gi,
    ];

    var filesDeleted = [
        /smallBanner\.jpg/i,
        /largeBanner\.jpg/i,
        /world\s*map\.jpg/i,
        /guidelines\s*for\s*button/gi,
        /course\s*search\s*tool/gi,
        /course\s*maintenance\s*request/gi,
        /copyright\s*permission/gi,
        /copyediting\s*style\s*sheet/gi,
        /discussion\sforums/gi,
        /setup\s*notes\s*for\s*development\s*team/gi,
        /how\s*to\s*understand\s*due\s*date(s)*/gi,
        /course\s*schedule\d*\D*archived/gi,
        // new RegExp(`${course.info.courseName}banner`, 'i'),
        // new RegExp(`${course.info.courseName}thumbnail`, 'i'),
    ];

    /* Online module items to delete, not on campus module items */
    var moduleItemsDeleted = [
        /guidelines\s*for\s*button/gi,
        /course\s*maintenance\s*request/gi,
        /copyright\s*permission/gi,
        /copyediting\s*style\s*sheet/gi,
        /discussion\sforums/gi,
        /how\s*to\s*understand\s*due\s*date(s)*/gi,
        /^schedule$/gi,
        /course\s*schedule\d*\D*archived/gi,
        /course\s*maintenance\s*log/gi,
        /course\s*search\s*tool/gi,
        /weekly\s*patterns?\s*(and|&)\s*expectations?\s*/gi,
        /course\s*outline/gi,
        /syllabus(?!\s*quiz)(?!\s*discussion)(?!\s*activity)/gi,
    ];

    /* Online modules to delete, not on campus modules */
    var modulesDeleted = [
        /\s*welcome\s*/gi,
        /^\s*resources\s*$/gi, // ^ and $ to prevent it from deleting "Student Resources" and "Instructor Resources"
    ];

    /* Online pages to delete, not on campus pages */
    var pagesDeleted = [
        /guidelines\s*for\s*button/gi,
        /discussion\sforums/gi,
        /how\s*to\s*understand\s*due\s*/gi,
        /course\s*maintenance\s*log/gi,
        /course\s*search\s*tool/gi,
        /weekly\s*patterns?\s*(and|&)\s*expectations?\s*/gi,
        /course\s*outline/gi,
    ];



    var doomedItems = '';
    if (item.constructor.name === 'Assignment') {
        doomedItems = assignmentsDeleted;
    }
    if (item.constructor.name === 'Discussion') {
        doomedItems = discussionsDeleted;
    }
    if (item.constructor.name === 'File') {
        doomedItems = filesDeleted;
    }
    if (item.constructor.name === 'Module') {
        doomedItems = modulesDeleted;
    }
    if (item.constructor.name === 'ModuleItem') {
        doomedItems = moduleItemsDeleted;
    }
    if (item.constructor.name === 'Page') {
        doomedItems = pagesDeleted;
    }

    /* Check if the item still exists but was marked for deletion */
    var notDeleted = doomedItems.find(currItem => currItem.test(item.getTitle()));

    /* If the item wasn't deleted, log it */
    if (notDeleted !== undefined) {
        logger.log(`${item.constructor.name} | Not Deleted From The Course`, {
            'Filename': item.getTitle(),
            'ID': item.getId(),
        });
    }

    return;
};