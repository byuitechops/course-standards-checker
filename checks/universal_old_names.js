module.exports = (item, logger, course) => {
    if (item.constructor.name === 'File') {
        return;
    }

    /* Pages to be renamed, in LOWER case */
    var itemsToRename = [{
        oldTitle: /Setup\s*(notes)?\sfor\sdevelopment\s*team/gi,
        newTitle: '-Setup Notes & Course Settings'
    }, {
        oldTitle: /library\s*research\s*guide/gi,
        newTitle: 'Library Research Guides'
    }, {
        oldTitle: /copyright\s*(and|&)\s*source\s*/gi,
        newTitle: 'Copyright & Source Information'
    }, {
        oldTitle: /^(l|w)?\d*\s*lesson\s*\d*\s*notes/gi,
        newTitle: 'Teaching Notes (Do NOT Publish)'
    }, {
        oldTitle: /general\s*lesson\s*notes/gi,
        newTitle: 'General Teaching Notes'
    }, {
        oldTitle: /\s*\d*\s*(Week|Lesson|L|W)\s*\d*\s*overview\s*$/gi,
        newTitle: 'Introduction'
    }, {
        oldTitle: /overview\s*\d*\s*(Week|Lesson|L|W)\s*\d*\s*$/gi,
        newTitle: 'Introduction'
    }];

    /* The test returns TRUE or FALSE - action() is called if true */
    var found = itemsToRename.find(renameItem => renameItem.oldTitle.test(item.getTitle()));

    if (found !== undefined && found.newTitle.replace(/\s/g, '') !== item.getTitle().replace(/\s/g, '')) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Current Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'Title Should Be': found.newTitle,
            'ID': item.getId(),
        });
    }
};

module.exports.details = {
    filename: 'universal_old_names',
    title: 'Old Titles',
    description: 'These are items that have old titles that should have been changed.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion',
    ]
};