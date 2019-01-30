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

    if (item.getHtml() == undefined) {
        item.moduleItems.forEach(element => {
            if (element.type === 'ExternalUrl') {
                logger.log(module.exports.details.title, {
                    'External URL Link': element.external_url,
                    'Link to Page': 'link',
                    'Course Code': '44444',
                    'Course Name': 'name',
                    'URL to Course': 'url'
                });
            }
        });
        return;
    }
    var $ = cheerio.load(item.getHtml());

    $('a').each((index, link) => {
        // if ($(link).attr('href') && $(link).attr('href').includes('youtube.com')) {
        logger.log(module.exports.details.title, {
            'External URL Link': $(link).attr('href'),
            'Link to Page': 'link',
            'Course Code': '44444',
            'Course Name': 'name',
            'URL to Course': 'url'
        });
        // }
    });

    $('iframe').each((index, link) => {
        // if ($(link).attr('src') && $(link).attr('src').includes('youtube.com')) {
        logger.log(module.exports.details.title, {
            'External URL Link': $(link).attr('src'),
            'Link to Page': 'link',
            'Course Code': '44444',
            'Course Name': 'name',
            'URL to Course': 'url'
        });
        // }
    });
};

module.exports.details = {
    filename: 'external_link_report', // exclude .js
    title: 'External Link Finder',
    description: 'Log all links that match the given domain',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion',
        'Module'
    ]
};