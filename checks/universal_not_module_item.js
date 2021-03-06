var validItems = [
    '-Setup Notes & Course Settings'
];

module.exports = (item, logger, course) => {
    /* If it isn't a valid type to run on, don't run */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* If it is a Quiz or Discussion under Assignments, skip it because it is already checked in Quizzes and Discussions */
    if (item.constructor.name === 'Assignment' && (item.quiz_id || item.discussion_topic)) {
        return;
    }

    /* Return if it is the homepage */
    if (item.constructor.name === 'Page' && (item.front_page === true || item.getTitle === '-Setup Notes & Course Settings')) {
        return;
    }

    /* Return if it is a valid non-module item */
    if (validItems.includes(item.getTitle())) {
        return;
    }

    var moduleItemList = course.modules.reduce((acc, module) => acc.concat(module.items), []);

    /* Pages don't have content_ids so we have to check if they are connected to module items through the page urls */
    if (item.constructor.name === 'Page') {
        var moduleItems = moduleItemList.filter(moduleItem => moduleItem.page_url !== undefined);
    } else {
        var moduleItems = moduleItemList.filter(moduleItem => moduleItem.content_id !== undefined);
    }

    /* Again, check pages through the url instead of through their ids which are different than most ids */
    var found = moduleItems.find(moduleItem => {
        if (item.constructor.name === 'Page') {
            return moduleItem.page_url === item.url;
        } else {
            return moduleItem.content_id === item.getId();
        }
    });

    /* If there was no module item found for the item, log it */
    if (found === undefined) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId(),
        });
    }
};

module.exports.details = {
    filename: 'universal_not_module_item', // exclude .js
    title: 'Not in Module Items',
    description: 'These items are not included in module items. They should be checked to see if are being used in the course.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
    ]
};