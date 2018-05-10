const canvas = require('canvas-api-wrapper');
const reports = require('./reports.js');
const complexityReport = require('./course_statistics.js');
const Logger = require('logger');
const logger = new Logger('Standards Check');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();

/* Checks to run each item through */
const checks = [
    require('./checks/files_large.js'),
    require('./checks/files_naming.js'),
    require('./checks/universal_old_names.js')
];

/* Disables location and timestamp in HTML report only */
logger.disableLocation = true;
logger.disableTimestamp = true;

/* Canvas ID */
enquirer.question('courseID', 'Canvas Course ID:');

enquirer.ask()
    .then(async answers => {

        /* Retrieve the course */
        var course = await canvas.getCourse(+answers.courseID);
        course.courseDetails = await canvas(`/api/v1/courses/${answers.courseID}`);

        /* Retrieve the contents of the course */
        var categories = [
            await course.files.getAll(),
            await course.pages.getAll(),
            await course.modules.getAll(),
            await course.quizzes.getAll(),
            await course.assignments.getAll(),
            await course.discussions.getAll(),
            // module items
            ([].concat(...(await Promise.all(course.modules.items.map(module => module.items.getAll()))))),
            // quiz questions
            ([].concat(...(await Promise.all(course.quizzes.items.map(quiz => quiz.questions.getAll()))))),
        ];

        course.moduleItemList = categories[categories.length - 2];

        /* For each category's items, run them through each check */
        categories.forEach(category => {
            category.forEach(item => {
                checks.forEach(check => check(item, logger, course));
            });
        });

        complexityReport(logger, course);

        reports(logger, course.courseDetails);
    })
    .catch(console.error);