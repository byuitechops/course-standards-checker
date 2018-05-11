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
    require('./checks/files_video_audio.js'),
    require('./checks/files_naming.js'),
    require('./checks/moduleitems_requirements.js'),
    require('./checks/module_contains.js'),
    require('./checks/universal_old_names.js'),
    require('./checks/universal_not_deleted.js'),
    require('./checks/universal_publish_settings.js'),
    require('./checks/universal_references.js'),
    require('./checks/universal_styling_div.js'),
    require('./checks/universal_not_module_item'),
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
            await course.pages.getAll(true),
            await course.modules.getAll(true),
            await course.quizzes.getAll(true),
            await course.assignments.getAll(),
            await course.discussions.getAll(),
            course.modules.reduce((acc, module) => acc.concat(module.items), []),
            course.quizzes.reduce((acc, quiz) => acc.concat(quiz.questions), []),
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