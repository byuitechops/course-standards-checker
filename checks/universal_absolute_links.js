const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml() || '');

    $('a').each((index, link) => {
        if ($(link).attr('href') && $(link).attr('href').includes(`byui.instructure.com/courses/${course.id}/file_contents/course`)) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'Type': 'Anchor Tag',
                'Links To': $(link).attr('href')
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_absolute_links',
    title: 'Absolute Links',
    description: 'Absolute links are links that point directly to a file by using its filepath. In Canvas, each file, page, discussion, etc. has a unique ID. Canvas links to them using the ID normally, which allows the file to moved around in the course files without it affecting any links to it. If the absolute filepath is used instead, however, moving the file will break the links.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};