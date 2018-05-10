const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {
    /* Look for the full prefix to see if it is a module item or not. Take into account everything included in resources folders */
    if (item.constructor.name === 'ModuleItem' || item.constructor.name === 'File' || item.constructor.name === 'Module') {
        return;
    }

var moduleItems = course.moduleItemList.filter(moduleItem => moduleItem.content_id !== undefined);

module.exports = (item, logger, course) => {

    // check if run

    var found = moduleItems.find(moduleItem => moduleItem.content_id === item.id);

    if (found) {
        logger.log(`${item.constructor.name} | No Associated Module Item`, {
            'Title': item.getTitle(),
            'ID': item.getId(),
        });
    }

};