#!/usr/bin/env node

const canvas = require('canvas-api-wrapper');
const reports = require('./reports.js');
const complexityReport = require('./course_statistics.js');
const Logger = require('logger');
const logger = new Logger('Standards Check');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();
const fs = require('fs');

/* Add script name here if you want to skip it, if it is broken or something */
const skipChecks = [];

var scriptNames = fs.readdirSync('./checks').filter(check => !skipChecks.includes(check));

/* Disables location and timestamp in HTML report only */
logger.disableLocation = true;
logger.disableTimestamp = true;

/* Register checkboxes and add questions */
enquirer.register('checkbox', require('prompt-checkbox'));
enquirer.question('courseID', 'Canvas Course ID:');
enquirer.question('checksToRun', {
    type: 'checkbox',
    message: 'Checks to Run:',
    default: scriptNames,
    choices: scriptNames
});

enquirer.ask()
    .then(async answers => {

        const checks = answers.checksToRun.map(scriptName => require('./checks/' + scriptName));

        /* Retrieve the course */
        var course = await canvas.getCourse(answers.courseID);

        console.log('Retrieving course data...');
        await course.getComplete();

        /* Retrieve the contents of the course */
        var categories = [
            course.files,
            course.pages,
            course.modules,
            course.modules.reduce((acc, module) => acc.concat(module.moduleItems), []),
            course.quizzes,
            course.quizzes.reduce((acc, quiz) => acc.concat(quiz.questions), []),
            course.assignments,
            course.discussions
        ];

        /* Function to wrap script titles in fancy display goodness */
        course.wrapTitle = (title, type) => `${title}&nbsp;<span style="color:#aaa">[${type}]</span>&nbsp;`;
        course.wrapLink = (url, text) => `<a target="_blank" href="${url}">${text}</a>`;

        /* For each category's items, run them through each check */
        categories.forEach(category => {
            category.forEach(item => {
                checks.forEach(check => check(item, logger, course));
            });
        });

        complexityReport(logger, course);
        reports(logger, course);
    })
    .catch(console.error);