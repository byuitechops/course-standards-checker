module.exports = (item, logger, course) => {
    /* Modules to be published, in LOWER case */
    var moduleSettings = [{
        reg: /instructor\s*resources/i,
        publish: false
    }];

    /* moduleItems to be published, in LOWER case */
    var moduleItemSettings = [{
        reg: /w\d?\d?\s(teaching|lesson)\snotes\s\(do\snot\spublish\)/gi,
        publish: false
    }];

    var publishSettings = '';

    if (item.constructor.name === 'Module') {
        publishSettings = moduleSettings;
    }
    if (item.constructor.name === 'ModuleItem') {
        publishSettings = moduleItemSettings;
    }

    /* The test returns TRUE or FALSE - action() is called if true */
    if (publishSettings) {
        var found = publishSettings.find(currItem => currItem.reg.test(item.getTitle()));
    }

    /* Log the items that weren't published */
    if (found !== undefined && item.published !== undefined && item.published !== found.publish) {
        logger.log(`Incorrect Publish Setting&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.getId(),
            'Currently': item.published,
            'Should Be Published': found.publish,
        });
    } else if (item.published !== undefined && item.published !== true) {
        logger.log(`${item.constructor.name} | Not published`, {
            'Title': item.getTitle(),
            'ID': item.getId(),
            'Published': item.published,
        });
    }
};