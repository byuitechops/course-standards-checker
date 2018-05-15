const cheerio = require('cheerio');

module.exports = (item, logger, course) => {

    /* THIS SCRIPT DOES NOT LOG ANYTHING */
    if (!course.counts) {
        course.counts = {
            anchor: 0,
            img: 0,
            iframe: 0,
            objects: 0,
            video: 0,
            audio: 0,
            kalturaLinks: 0,
            qualtricsLinks: 0,
            equellaLinks: 0,
        };
    }

    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    course.counts.anchor += $('a').get().length;
    course.counts.img += $('img').get().length;
    course.counts.iframe += $('iframe').get().length;
    course.counts.video += $('video').get().length;
    course.counts.audio += $('audio').get().length;
    course.counts.object += $('object').get().length;
    course.counts.kalturaLinks += $('[src*="kaltura"]').get().length + $('[href*="kaltura"]').get().length;
    course.counts.qualtricsLinks += $('[src*="qualtrics"]').get().length + $('[href*="qualtrics"]').get().length;
    course.counts.equellaLinks += $('[src*="content.byui"]').get().length + $('[href*="content.byui"]').get().length;
    course.counts.img += $('*').filter((index, el) => {
        return $(el).css('background-image') !== undefined;
    }).get().length;
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