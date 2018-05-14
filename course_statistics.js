module.exports = (logger, course) => {

    /* Category Item Results */
    logger.log('Course Stastics', {
        'Category': 'Number of Modules',
        'Result': course.modules.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Files',
        'Result': course.files.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Discussions',
        'Result': course.discussions.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Assignments',
        'Result': course.assignments.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Quizzes',
        'Result': course.quizzes.length
    });
    logger.log('Course Stastics', {
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
            'Result': course.counts.iframe
        });
    }

    /* Total Course File Size */
    logger.log('Course Stastics', {
        'Category': 'Combined File Size',
        'Result': `${course.files.reduce((acc, file) => acc + file.size, 0)/1000000} MB`
    });

};