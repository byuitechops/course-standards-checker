module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /*  */
    if (item.name.includes('Instructor Resources') || item.name.includes('Student Resources')) {
        return;
    }

    /* Naming Conventions for Module Items. The 'title' property is not used, but is meant to help understand the regex */
    var namingConvention = [{
        title: 'Weekly Module',
        regex: /^Week\s\d\d(:\s*(\S*\s*\S*\s*\S*\s*\S*\s*\S*)\s*)?$/, // Should have a max of five words after the ':'
    }, {
        title: 'Instructor Resources (Do NOT Publish)',
        regex: /^Instructor\sResources\s\(Do\sNOT\sPublish\)$/,
    }, {
        title: 'Student Resources',
        regex: /^Student\sResources$/,
    }];

    /* Test the module name against the naming convention regex */
    var found = namingConvention.find(convention => convention.regex.test(item.getTitle()));

    /* If it the module name doesn't follow the naming convention, log it */
    if (found === undefined) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId(),
        });
    }

};

module.exports.details = {
    filename: 'folders_main', // exclude .js
    title: 'Module Naming Conventions',
    description: 'These Modules do not follow the standardized naming conventions',
    types: [
        'Module',
    ]
};