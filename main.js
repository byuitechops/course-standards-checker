#!/usr/bin/env node

const canvas = require('canvas-api-wrapper');
const reports = require('./reports.js');
const complexityReport = require('./course_statistics.js');
const Logger = require('logger');
// const logger = new Logger('Standards Check');
const fs = require('fs');
const d3 = require('d3-dsv');
const path = require('path');
const promptUser = require('./cli.js');

/* Add script name here if you want to skip it, if it is broken or something */
const skipChecks = [
    'files_large.js',
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
    'universal_transcripts.js'
];


var scriptNames = fs.readdirSync('./checks').filter(check => !skipChecks.includes(check));

// /* Disables location and timestamp in HTML report only */
// logger.disableLocation = true;
// logger.disableTimestamp = true;


function getCourses(answers) {
    try {
        let courses = [];

        if (answers.csvPath !== undefined) {
            let fileContents = fs.readFileSync(path.resolve(answers.csvPath), { encoding: 'utf8' });
            courses = d3.csvParse(fileContents, (row) => {
                return {
                    courseCode: row['Course Code'],
                    courseID: row['Canvas Course ID']
                }
            });
            // Some courses don't have course ID's for some reason...so we're excluding them for now
            return courses.filter(course => course.courseID !== '');
        }
        return [{ courseID: answers.courseID }];
    } catch (err) {
        console.error('Error getting courses', err)
    }
}

promptUser(scriptNames)
    .then(async answers => {
        const checks = answers.checksToRun.map(scriptName => require('./checks/' + scriptName));

        let courses = getCourses(answers);
        for (let i = 0; i < courses.length; i++) {
            let logger = new Logger(`Standards Check - ${courses[i].courseCode} - ID: ${courses[i].courseID}`);

            /* Disables location and timestamp in HTML report only */
            logger.disableLocation = true;
            logger.disableTimestamp = true;

            try {

                /* Retrieve the course */
                var course = await canvas.getCourse(courses[i].courseID);

                console.log('Retrieving course data...');
                console.log(courses[i]);
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
            } catch (err) {
                /* Function to wrap script titles in fancy display goodness */
                course.wrapTitle = (title, type) => `${title}&nbsp;<span style="color:#aaa">[${type}]</span>&nbsp;`;
                course.wrapLink = (url, text) => `<a target="_blank" href="${url}">${text}</a>`;

                logger.error(`Error running course ${courses[i].courseCode} ID: ${courses[i].courseID}\n ${err}`)
                complexityReport(logger, course);
                reports(logger, course);
            }
        }
    })
    .catch(console.error);