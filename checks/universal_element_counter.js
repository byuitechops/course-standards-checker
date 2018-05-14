const cheerio = require('cheerio');

module.exports = (item, logger, course) => {

    /* THIS SCRIPT DOES NOT LOG ANYTHING */
    if (!course.counts) {
        course.counts = {
            anchor: 0,
            img: 0,
            iframe: 0,
            kalturaLinks: 0,
        };
    }

    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    course.counts.anchor += $('a').get().length;
    course.counts.img += $('img').get().length;
    course.counts.iframe += $('iframe').get().length;
    course.counts.kalturaLinks += $('[src*="kaltura"]').get().length + $('[href*="kaltura"]').get().length;
};

module.exports.details = {
    filename: 'universal_element_counter',
    title: 'Element Counter',
    description: 'This solely counts element types for the course statistics.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};