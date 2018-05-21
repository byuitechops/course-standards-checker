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
    /course\s*search\s*tool/gi,
    /weekly\s*patterns?\s*(and|&)\s*expectations?\s*/gi,
    /course\s*outline/gi,
    /setup\snotes\s&\scourse\ssettings/i,
    /(mid)\s*\D?\s*(course|semester)\s*(feedback)/i,
];

/* Online modules to delete, not on campus modules */
var modulesDeleted = [
    /\s*welcome\s*/gi,
    /^\s*resources\s*$/gi, // ^ and $ to prevent it from deleting "Student Resources" and "Instructor Resources"
    /I-?Learn\s*(3\.0)?\s*Tour/gi,
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

module.exports = (item, logger, course) => {
    var doomedItems = '';
    var notDeleted = '';

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
    if (doomedItems) {
        notDeleted = doomedItems.find(currItem => currItem.test(item.getTitle()));
    }

    /* If the item wasn't deleted, log it */
    if (notDeleted) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId(),
        });
    }
};

module.exports.details = {
    filename: 'universal_not_deleted', // exclude .js
    title: 'Items Not Removed From Course',
    description: 'These items should be removed from the course.',
    types: [
        'Assignment',
        'Discussion',
        'File',
        'ModuleItem',
        'Module',
        'Page',
        'Quiz'
    ]
};