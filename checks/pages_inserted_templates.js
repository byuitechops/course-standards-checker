const canvas = require('canvas-api-wrapper');

module.exports = (item, logger) => {

    if (item.constructor.name !== 'Page') {
        return;
    }

    var pagesToChange = [{
            title: /(Release Notes)/gi,
            template: require('../misc_scripts/Release Notes.js'),
            templateName: 'Release Notes.js'
        },
        {
            title: /(Setup for Course Instructor)/gi,
            template: require('../misc_scripts/SetupNotes.js'),
            templateName: 'SetupNotes.js'
        },
        {
            title: /(General Lesson Notes)/gi,
            template: require('../misc_scripts/LessonNotes.js'),
            templateName: 'LessonNotes.js'
        },
        {
            title: /(Setup Notes & Course Settings)|(Setup Notes for Development Team)/gi,
            template: require('../misc_scripts/courseSetup.js'),
            templateName: 'courseSetup.js'
        },
    ];

    var page = pagesToChange.find(currPage => currPage.title.test(item.getTitle()));

    if (page !== undefined) {
        var hasTemplate = item.body.includes(page.template() + '<h2 style="color:red">Old Content</h2>');
        if (hasTemplate !== true) {
            logger.log(`${item.constructor.name} | Page Missing Template`, {
                'Title': item.getTitle(),
                'ID': item.getId(),
                'Template Needed': page.templateName
            });
        }
    }
};