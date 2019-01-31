/* Based off of universal_link_finder.js */

const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    /* Set variables for later use */
    var courseId = course.id;
    var courseName = course.name;
    var courseCode = course.course_code;

    /* Return if it isn't a type that has HTML */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* Return if it is the homepage */
    if (item.constructor.name === 'Page' && item.front_page === true) {
        return;
    }

    /* Module Items are set up different, so this loops through them properly to get external links */
    if (item.getHtml() == undefined) {
        item.moduleItems.forEach(element => {
            if (element.type === 'ExternalUrl') {
                logger.log(module.exports.details.title, {
                    'External URL Link': element.external_url,
                    'Link to Page': item.getUrl(),
                    'Course Code': courseCode,
                    'Course Name': courseName,
                    'URL to Course': `https://byui.instructure.com/courses/${courseId}`
                });
            }
        });
        return;
    }

    /* This gets the href from each a and iframe tag on all items except module items */
    var $ = cheerio.load(item.getHtml());

    $('a').each((index, link) => {
        logger.log(module.exports.details.title, {
            'External URL Link': $(link).attr('href'),
            'Link to Page': item.getUrl(),
            'Course Code': courseCode,
            'Course Name': courseName,
            'URL to Course': `https://byui.instructure.com/courses/${courseId}`
        });
    });

    $('iframe').each((index, link) => {
        logger.log(module.exports.details.title, {
            'External URL Link': $(link).attr('src'),
            'Link to Page': item.getUrl(),
            'Course Code': courseCode,
            'Course Name': courseName,
            'URL to Course': `https://byui.instructure.com/courses/${courseId}`
        });
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