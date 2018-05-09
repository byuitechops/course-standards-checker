const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {
    // An array of the types that should be run
    let types = [
        'Assignment',
        'Discussion',
        'File',
        'ModuleItem',
        'Module',
        'Page',
        'Quiz',
        'QuizQuestion',
    ];

    // Check if item type should be run
    var run = types.find(currType => currType === item.constructor.name);

    /* If run is undefined, then move to the next item */
    if (run === undefined) {
        return;
    }

    /* Example Log */

    logger.log(`${item.constructor.name} | What it be about`, {
        'Title': 'title goes here',
        'ID': 'ID goes here',
        'etc': 'other stuff'
    });

    // item.getId()
    // item.getTitle()
    // item.setTitle(title)
    // item.getHtml()
    // item.setHtml(html)
    // item.get(callback)
    // item.update(callback)
    // item.delete(callback)
    // item.create(callback)
};