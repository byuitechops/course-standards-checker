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

    if (item.completion_requirement === undefined &&
        !badTypes.includes(item.type) &&
        (instructorResources && item.module_id !== instructorResources.id) &&
        (studentResources && item.module_id !== studentResources.id)) {

        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.id,
            'Module': course.modules.find(module => module.id === item.module_id).name,
            'Type': item.type,
        });

    }
}

module.exports.details = {
    filename: 'moduleitems_requirements', // exclude .js
    title: 'Module Item Requirements',
    description: 'All module items should have requirements. Ones that do not are listed below.',
    types: ['ModuleItem']
};