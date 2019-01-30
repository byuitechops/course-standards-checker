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
const skipChecks = ['files_large.js',
    'files_naming.js',
    'files_video_audio.js',
    'folders_extra.js',
    'folders_main.js',
    // 'generate_external_link_report.js',
    'item_template.js',
    'module_contains.js',
    'module_naming_conventions.js',
    'moduleitems_naming_conventions.js',
    'moduleitems_requirements.js',
    'moduleitems_title_lengths.js',
    'pages_homepage.js',
    'universal_absolute_links.js',
    'universal_alt_attributes.js',
    'universal_bad_links.js',
    'universal_dirty_html.js',
    'universal_element_counter.js',
    'universal_link_finder.js',
    'universal_not_deleted.js',
    'universal_not_module_item.js',
    'universal_old_names.js',
    'universal_publish_settings.js',
    'universal_references.js',
    'universal_styling_div.js',
    'universal_table_classes.js',
    'universal_target_attributes.js',
    'universal_transcripts.js'];


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