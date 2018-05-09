const canvas = require('canvas-api-wrapper');
const reports = require('./reports.js');
const Logger = require('logger');
const logger = new Logger('Standards Check');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();

/* Checks to run each item through */
const checks = [
    require('./checks/files_large.js')
];

/* Canvas ID */
enquirer.question('courseID', 'Canvas Course ID:');

enquirer.ask()
    .then(async answers => {

        /* Retrieve the course */
        var course = await canvas.getCourse(+answers.courseID);

        /* Retrieve the contents of the course */
        var categories = [
            await course.files.getAll(),
            await course.pages.getAll(),
            await course.modules.getAll(),
            await course.quizzes.getAll(),
            await course.assignments.getAll(),
            await course.discussions.getAll()
        ];

        /* For each category's items, run them through each check */
        categories.forEach(category => {
            category.forEach(item => {
                checks.forEach(check => check(item, logger));
            });
        });

        reports(logger, answers.courseID);
    })
    .catch(console.error);