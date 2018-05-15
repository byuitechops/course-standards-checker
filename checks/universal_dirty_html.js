const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    /* Return if it isn't a type that has HTML */
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    try {
        var $ = cheerio.load(item.getHtml());

        var tagTests = [{
            tag: 'i',
            issue: 'Should be "em" tag'
        }, {
            tag: 'b',
            issue: 'Should be "strong" tag'
        }, {
            tag: 'div#main',
            issue: 'Deprecated "main" Div'
        }, {
            tag: 'div#header',
            issue: 'Deprecated "header" Div'
        }, {
            tag: 'div#article',
            issue: 'Deprecated "article" Div'
        }];

        tagTests.forEach(tagTest => {
            $(tagTest.tag).each((index, el) => {
                if (tagTest.issue === 'Empty Tag' && $(el).hasClass('byui')) {
                    return;
                }
                logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                    'Title': course.wrapLink(item.getUrl(), item.getTitle()),
                    'Element Type': el.tagName,
                    'Issue': tagTest.issue,
                    'ID': item.getId(),
                });
            });

        });
    } catch (e) {
        console.log(tagTest);
        console.log(e);
    }

};

module.exports.details = {
    filename: 'universal_bad_html',
    title: 'Dirty HTML',
    description: 'These items contain HTML that we consider "dirty." This includes using any deprecated classes or elements that were used in Brightspace, empty tags, and any "i" or "b" tags.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion'
    ]
};