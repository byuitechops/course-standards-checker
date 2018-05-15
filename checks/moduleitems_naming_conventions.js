module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* If the parent module is Instructor Resources or Student Resources, the module items shouldn't have the naming conventions */
    if (item.name.includes('Instructor Resources') || item.name.includes('Student Resources')) {
        return;
    }

    /* Naming Conventions for Module Items. The 'title' property is not used, but is meant to help understand the regex */
    var namingConventions = [{
        title: 'Module Item Prefix',
        regex: /^W\d\d\s*\w+:/,
    }, {
        title: 'Wxx Teaching Notes',
        regex: /^W\d\d\sTeaching\sNotes\s\(Do\sNOT\sPublish\)$/,
    }, {
        title: 'Orientation to Online Learning',
        regex: /^Orientation\sto\sOnline\sLearning$/,
    }];

    item.items.forEach(moduleItem => {
        /* Test the module item name against the naming convention regex */
        var found = namingConventions.find(convention => convention.regex.test(moduleItem.title));

        /* If it the module item name doesn't follow one of the naming conventions, log it */
        if (found === undefined) {
            logger.log(course.wrapTitle(module.exports.details.title, 'ModuleItem'), {
                'Title': course.wrapLink(moduleItem.html_url, moduleItem.title),
                'ID': moduleItem.id,
            });
        }
    });
};

module.exports.details = {
    filename: 'moduleitems_naming_conventions', // exclude .js
    title: 'Module Item Naming Conventions',
    description: 'These Module Items do not follow the standardized naming conventions.',
    types: [
        'Module',
    ]
};