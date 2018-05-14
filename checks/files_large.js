module.exports = (item, logger, course) => {

    if (item.constructor.name !== 'File') {
        return;
    } else if (item.size > 15000000) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Filename': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.id,
            'Size': `${Math.round(item.size / 1000000)} MB`
        });
    }

};

module.exports.details = {
    filename: 'files_large',
    title: 'Large Files',
    description: 'These are files that are over 15 MB in size.',
    types: ['File']
};