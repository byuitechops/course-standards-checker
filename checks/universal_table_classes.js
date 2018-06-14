const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());
    var tables = $('table').get();

    tables.forEach(table => {
        var classes = $(table).attr('class');

        if (classes === undefined) {
            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'ic-Table Class Found': false,
                'Current Classes on Table': 'None',
            });
        } else {
            classes = classes.split(' ');
            var icTable = classes.find(currClass => /^ic-Table$/i.test(currClass));

            logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                'ID': item.getId(),
                'ic-Table Class Found': icTable ? true : false,
                'Current Classes on Table': classes,
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_table_css',
    title: 'Table CSS Classes',
    description: 'These are items that have html `< table >` elements that do not have the proper classes',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};