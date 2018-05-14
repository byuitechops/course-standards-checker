var references = [{
    reg: /!\[CDATA[\s\S]*\]\]/gi,
    type: 'Javascript'
}, {
    reg: /(brightspace)(?!\.com)/gi,
    type: 'Brightspace References'
}, {
    reg: /brainhoney/ig,
    type: 'Brainhoney References'
}, {
    reg: /adobe\s*connect/ig,
    type: 'Adobe Connect References'
}, {
    reg: /((google\s*)?hangouts?(\s*on\s*air)?)|(HOA)/ig,
    type: 'Hangouts on Air References'
}];

var validItems = [
    'Release Notes'
];

module.exports = (item, logger, course) => {
    if (!module.exports.details.types.includes(item.constructor.name) || validItems.includes(item.getTitle())) {
        return;
    }

    /* Check each regex to see if the item contents has any matches */
    references.forEach(ref => {
        /* Get all the matches */
        var matches = item.getHtml().match(ref.reg);
        /* See if it contains any of what we're looking for... */
        if (matches != null) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'Reference': ref.type,
                'Number of References': matches.length,
                'ID': item.getId()
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_references', // exclude .js
    title: 'Outdated References & Inline Code',
    description: 'These items contain references to outdated resources or use inline javascript that will not work in Canvas.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};