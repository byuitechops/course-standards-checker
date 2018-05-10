module.exports = (item, logger) => {
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

    if ((found !== undefined && found.newTitle !== item.getTitle())) {
        logger.log(`Still Using Old Name&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Current Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'Title Should Be': found.newTitle,
            'ID': item.getId(),
        });
    }
};