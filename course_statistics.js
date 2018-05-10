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

    /* Total Course File Size */
    logger.log('Course Stastics', {
        'Category': 'Combined File Size',
        'Result': `${course.files.reduce((acc, file) => acc + file.size, 0)/1000000} MB`
    });

    // Total lines of text
    // Total point values
    // Number of due dates
    // Highest character count in course
};