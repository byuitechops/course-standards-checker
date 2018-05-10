module.exports = (logger, course) => {

    /* Category Item Results */
    logger.log('Course Stastics', {
        'Category': 'Number of Modules',
        'Result': course.modules.items.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Files',
        'Result': course.files.items.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Discussions',
        'Result': course.discussions.items.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Assignments',
        'Result': course.assignments.items.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Quizzes',
        'Result': course.quizzes.items.length
    });
    logger.log('Course Stastics', {
        'Category': 'Number of Pages',
        'Result': course.pages.items.length
    });

    /* Total Course File Size */
    logger.log('Course Stastics', {
        'Category': 'Combined File Size',
        'Result': `${course.files.items.reduce((acc, file) => acc + file.size, 0)/1000000} MB`
    });

    // Total lines of text
    // Total point values
    // Number of due dates
    // Highest character count in course
};