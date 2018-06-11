module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    if (!course.titleLengths) {
        course.titleLengths = [];
    }

    course.titleLengths.push(item.getTitle().length);
};

module.exports.details = {
    filename: 'item_template', // exclude .js
    title: 'Large Files',
    description: 'These are files that are over 15 MB in size. Blah blah blah.',
    types: [
        'ModuleItem',
    ]
};