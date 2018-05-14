const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    /* Return if it isn't a type that has HTML */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var badDomains = [
        'brightspace'
    ];

    var $ = cheerio.load(item.getHtml());

    $('a').each((index, link) => {
        if ($(link).attr('href') && badDomains.some(domain => $(link).attr('href').includes(domain))) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Type': 'Anchor Tag',
                'Links To': $(link).attr('href')
            });
        }
    });

    $('img').each((index, image) => {
        if ($(image).attr('src') && badDomains.some(domain => $(image).attr('src').includes(domain))) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Type': 'Image',
                'Links To': $(image).attr('src')
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_bad_links',
    title: 'Bad Links',
    description: 'These links point somewhere they should not. Typically, they point to Brightspace.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};