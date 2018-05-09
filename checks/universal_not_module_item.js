const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {
    /* Look for the full prefix to see if it is a module item or not. Take into account everything included in resources folders */
    if (item.constructor.name === 'ModuleItem') {
        return;
    }

    var title = item.getTitle();
    var prefixes = [
        /W\d?\d?\s_ActivityType_:/,
        /W\d?\d?\sDiscussion:/,
        /W\d?\d?\sQuiz:/
    ];

    var found = prefixes.find(prefix => !title.match(prefix));

    if (found !== undefined) {
        logger.log(`${item.constructor.name} | No Associated Module Item`, {
            'Title': item.getTitle(),
            'ID': item.getId(),
        });
    }
};