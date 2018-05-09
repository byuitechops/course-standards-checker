const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {
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

    if (found !== undefined) {
        logger.log(`${item.constructor.name} | Still Using Old Name`, {
            'Current Title': item.getTitle(),
            'Title Should Be': found.newTitle,
            'ID': item.getId(),
        });
    }
};