const validItems = [
    /teaching\snotes/i
];

module.exports = (item, logger, course) => {
    if (item.constructor.name !== 'ModuleItem' || validItems.some(validItem => validItem.test(item.title))) {
        return;
    }

    var instructorResources = course.modules.find(module => module.name.includes('Instructor Resources'));
    var studentResources = course.modules.find(module => module.name.includes('Student Resources'));
    var badTypes = [
        'SubHeader',
        'ExternalTool',
    ];
    var instructorResources = course.modules.find(module => module.name.includes('Instructor Resources'));
    var studentResources = course.modules.find(module => module.name.includes('Student Resources'));

    if (item.completion_requirement === undefined &&
        !badTypes.includes(item.type) &&
        item.module_id !== instructorResources.id &&
        item.module_id !== studentResources.id) {

        logger.log(`No Completion Requirements&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.id,
            'Module': course.modules.find(module => module.id === item.module_id).name,
            'Type': item.type,
        });

    }
}