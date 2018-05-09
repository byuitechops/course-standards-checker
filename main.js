const canvas = require('canvas-api-wrapper');
const reports = require('./reports.js');
const Logger = require('logger');
const logger = require('logger');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();

/* Checks to run each item through */
const checks = [
    require('./checks/test-check.js')
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
                checks.forEach(check => check(item));
            });
        });

        reports(logger, answers.courseID);
    })
    .catch(console.error);