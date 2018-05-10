const cheerio = require('cheerio');

module.exports = (item, logger, course) => {

    let types = [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
    ];

    if (!types.includes(item.constructor.name)) {
        return;
    }

    var $ = cheerio.load(item.getHtml());

    var courseCode = course.courseDetails.course_code.replace(/\s/g, '').toLowerCase();
    var count = $(`.byui.${courseCode}`).get().length;

    if (count === 0) {
        logger.log(`Incorrect or Missing "byui [course code]" Styling Classes&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.getId()
        });
    } else if (count > 1) {
        logger.log(`Multiple "byui [course code]" Styling Classes Present&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.getId()
        });
    }
};