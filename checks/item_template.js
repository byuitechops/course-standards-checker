module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    // Example Log
    logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
        'Title': course.wrapLink(item.getUrl(), item.getTitle()),
        'ID': item.getId(),
        'etc': 'other stuff'
    });

    // item.getId()
    // item.getTitle()
    // item.setTitle(title)
    // item.getHtml()
    // item.setHtml(html)
    // item.get(optionalCallback)
    // item.update(optionalCallback)
    // item.delete(optionalCallback)
    // item.create(optionalCallback)
};

module.exports.details = {
    filename: 'item_template', // exclude .js
    title: 'Large Files',
    description: 'These are files that are over 15 MB in size. Blah blah blah.',
    types: [
        'Assignment',
        'Discussion',
        'File',
        'ModuleItem',
        'Module',
        'Page',
        'Quiz',
        'QuizQuestion',
    ]
};