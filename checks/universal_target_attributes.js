/* Based off of universal-alt-attribute.js - Need to add more functionality for universal-target-attributes.js */

const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    /* Return if it isn't a type that has HTML */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* Return if it is the homepage */
    if (item.constructor.name === 'Page' && item.front_page === true) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    $('a').each((index, link) => {
        if ($(link).attr('href') && $(link).attr('href').includes('byui.instructure')) {
            return;
        }
        if (!$(link).attr('target') || $(link).attr('target') !== '_blank') {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'URL': $(link).attr('href'),
                'Currently': $(link).attr('target') || 'Not Added',
                'Expectation': 'target="_blank"'
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_target_attributes', // exclude .js
    title: 'Target Attributes',
    description: 'Target attributes on anchor tags to external sites should always be set to open in a new page. This is done by adding <span style="color:blue">target="_blank"</span> to the anchor tag.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};