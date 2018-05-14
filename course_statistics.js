module.exports = (logger, course) => {

    /* Category Item Results */
    logger.log('Course Statistics', {
        'Category': 'Number of Modules',
        'Result': course.modules.length
    });
    logger.log('Course Statistics', {
        'Category': 'Number of Files',
        'Result': course.files.length
    });
    logger.log('Course Statistics', {
        'Category': 'Number of Discussions',
        'Result': course.discussions.length
    });
    logger.log('Course Statistics', {
        'Category': 'Number of Assignments',
        'Result': course.assignments.length
    });
    logger.log('Course Statistics', {
        'Category': 'Number of Quizzes',
        'Result': course.quizzes.length
    });
    logger.log('Course Statistics', {
        'Category': 'Number of Pages',
        'Result': course.pages.length
    });

    /* HTML Element Counts */
    if (course.counts) {
        logger.log('Course Statistics', {
            'Category': 'Number of Links',
            'Result': course.counts.anchor
        });
        logger.log('Course Statistics', {
            'Category': 'Number of Images',
            'Result': course.counts.img
        });
        logger.log('Course Statistics', {
            'Category': 'Number of Iframes',
            'Result': course.counts.iframe
        });
        logger.log('Course Statistics', {
            'Category': 'Kaltura Links',
            'Result': course.counts.kalturaLinks
        });
        logger.log('Course Statistics', {
            'Category': 'Qualtrics Links',
            'Result': course.counts.qualtricsLinks
        });
    }

    /* Total Course File Size */
    logger.log('Course Statistics', {
        'Category': 'Combined File Size',
        'Result': `${(course.files.reduce((acc, file) => acc + file.size, 0)/1000000).toFixed(2)} MB`
    });

    // TODO number of qualtrics
    // TODO number of equella links
    // TODO harvard business school links
    // TODO round combined file size
    // TODO add object, audio, video tags
};