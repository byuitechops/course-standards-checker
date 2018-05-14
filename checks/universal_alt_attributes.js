/* Based off of universal-alt-attribute.js - Need to add more functionality for universal-target-attributes.js */

const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    /* Return if it isn't a type that has HTML */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    $('img').each((index, image) => {
        if (!$(image).attr('alt')) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'Currently': $(image).attr('alt') || '(Empty)',
                'Image Source': $(image).attr('src'),
                'ID': item.getId(),
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_alt_attributes', // exclude .js
    title: 'Empty Alt Attributes',
    description: 'Images need good alt text for screen readers. These images do not have any alt text.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};