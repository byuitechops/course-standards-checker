module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* All of the standardized folder names/ file paths */
    var mainFolders = [{
        title: 'course files',
        regex: /^course\sfiles$/gi,
    }, {
        title: 'documents',
        regex: /^course\sfiles\/(docs|documents)$/gi,
    }, {
        title: 'media',
        regex: /^course\sfiles\/media$/gi,
    }, {
        title: 'template',
        regex: /^course\sfiles\/template$/gi,
    }, {
        title: 'archive',
        regex: /^course\sfiles\/archive$/gi,
    }, {
        title: 'course_image',
        regex: /^course\sfiles\/course_image$/gi,
    }, {
        title: 'Weekly Folder',
        regex: /^course\sfiles\/documents\/Week\s\d\d$/gi,
    }, {
        title: 'Weekly Folder',
        regex: /^course\sfiles\/media\/Week\s\d\d$/gi,
    }];

    /* Check if the folder name matches one of the standardized names */
    var found = mainFolders.find(folder => folder.regex.test(item.full_name));

    /* If it the folder name doesn't match one of the standardized names, log it */
    if (found === undefined) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId(),
        });
    }
};

module.exports.details = {
    filename: 'folders_main', // exclude .js
    title: 'Folder Names',
    description: 'These folders are extra and are not part of the standard.',
    types: [
        'Folder'
    ]
};