/* Used to only run this module once on all course folders */
var alreadyLogged = false;

module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name) || alreadyLogged === true) {
        return;
    }

    /* All of the main folders in order with the index found in the notFound array */
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
    }];

    /* Each item found in mainFolders must be present here with the same index */
    var notFound = [
        'course files',
        'documents',
        'media',
        'template',
        'archive',
        'course_image',
    ];

    /* For each of the main folders, if the folder exists remove it from the notFound array */
    mainFolders.forEach((testFolder) => {
        course.folders.forEach(folder => {
            var match = testFolder.regex.test(folder.full_name);
            if (match) {
                notFound.splice(notFound.indexOf(testFolder.title), 1);
            }
        });
    });

    /* Log the missing main folders */
    if (notFound.length !== 0 && alreadyLogged === false) {
        /* Log the items that haven't been removed from the notFound array */
        notFound.forEach(missing => {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Main Folder Not Found': missing,
            });
        });
    }

    /* Set to true to only run and log the module once, instead of for each folder */
    alreadyLogged = true;
};

module.exports.details = {
    filename: 'folders_main', // exclude .js
    title: 'Folder Names',
    description: 'These are the main folders that are missing in the file structure.',
    types: [
        'Folder'
    ]
};