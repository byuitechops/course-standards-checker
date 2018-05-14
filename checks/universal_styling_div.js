const cheerio = require('cheerio');

module.exports = (item, logger, course) => {

    let types = [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
    ];

    if (!types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    /* Remove spaces, lower case that course code, and gimme it without ":master" or anything that will break because it isn't a "real psuedo selector" (mocking tone) */
    var courseCode = course.course_code.replace(/\s/g, '').toLowerCase().split(':')[0];
    var count = $(`.byui.${courseCode}`).get().length;

    if (count !== 1) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId()
        });
    }
};

module.exports.details = {
    filename: 'universal_styling_div',
    title: 'BYUI Styling Classes',
    description: 'These items are either missing the required "byui [course code]" styling classes, or it is incorrectly inserted. This includes it being inserted multiple times.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz'
    ]
};