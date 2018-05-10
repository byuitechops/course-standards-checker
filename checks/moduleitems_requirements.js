const canvas = require('canvas-api-wrapper');

module.exports = (item, logger, course) => {
    if (item.constructor.name !== 'ModuleItem') {
        return;
    }

    var badTypes = [
        'SubHeader',
        'ExternalUrl',
        'ExternalTool',
    ];
    var instructorResources = course.modules.find(module => module.name.includes('Instructor Resources'));
    var studentResources = course.modules.find(module => module.name.includes('Student Resources'));

    if (item.completion_requirement === undefined &&
        !badTypes.includes(item.type) &&
        item.module_id !== instructorResources.id &&
        item.module_id !== studentResources.id) {
        logger.log(`${item.constructor.name} | No Completion Requirements`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.title}</a>`,
            'ID': item.id,
            'Type': item.type
        });
    }
}