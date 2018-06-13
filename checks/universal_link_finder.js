/* Based off of universal_target_attribute.js */

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
        if ($(link).attr('href') && $(link).attr('href').includes('youtube.com')) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Tag Type': `a`,
                'URL': $(link).attr('href')
            });
        }
    });

    $('iframe').each((index, link) => {
        if ($(link).attr('src') && $(link).attr('src').includes('youtube.com')) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Tag Type': `iframe`,
                'SRC': $(link).attr('src')
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_link_finder', // exclude .js
    title: 'Universal Link Finder',
    description: 'Log all links that match the given domain',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};