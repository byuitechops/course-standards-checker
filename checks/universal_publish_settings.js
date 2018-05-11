module.exports = (item, logger, course) => {

    function logItem(shouldBe) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.html_url, item.getTitle()),
            'ID': item.getId(),
            'Currently': item.published,
            'Should Be Published': shouldBe,
        });
    }

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

    var instructorResources = course.modules.find(module => module.getTitle().includes('Instructor Resources'));

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

    /* If it is a MODULE ITEM and we DIDNT find something from the regexs... */
    if (item.constructor.name === 'ModuleItem' && found === undefined && item.published !== undefined) {
        if (instructorResources && item.module_id === instructorResources.getId()) {
            /* If it is a module item, and it is in Instructor Resources, it should be unpublished */
            if (item.published === true) {
                logItem(false);
            }
        } else if (item.published !== true) {
            /* If it is not in Instructor Resources, it should be published */
            logItem(true);
        }
    }

    /* If it is a MODULE and we DIDNT find something from the regexs, it should be published */
    if (item.constructor.name === 'Module' && found === undefined && item.published === false) {
        logItem(true);
    }
};

module.exports.details = {
    filename: 'universal_publish_settings', // exclude .js
    title: 'Incorrect Publish Settings',
    description: 'These are items that are incorrectly published or unpublished.',
    types: [
        'ModuleItem',
        'Module'
    ]
};