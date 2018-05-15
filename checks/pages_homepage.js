// Change class from 'byui oct' to 'byui coursecodenospaces' (i.e. 'byui nurs449')
// Change <h2> to whatever the course code thing should be
// Change <img> src to be the class image
var cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* Only apply check to the course homepage */
    if (!item.getTitle().includes('Course Homepage')) {
        return;
    }

    /* Load html for the course homepage */
    var $ = cheerio.load(item.getHtml());

    /* Get the first two words of the course code */
    var classCode = course.course_code.split(' ');
    classCode = classCode.slice(0, 1);
    classCode = classCode.join('');

    /* Filter the course code, getting rid of dashes and colons */
    classCode = classCode.replace(/:?/g, '');
    classCode = classCode.replace(/-*/g, '');

    /* Make a copy that has spaces in the code */
    var courseCode = classCode;

    /* Get rid the spaces for the class name */
    classCode = course.course_code.replace(/\s/g, '');

    /* Get the html parts to check against */
    var classNames = $('div').first().attr('class');
    var src = $('img').attr('src');
    var h2 = $('h2').first().text();

    var hasHomeImage = false;

    /* See if the homeImage.jpg file exists */
    var homeImage = course.files.find(file => /homeimage.jpg/i.test(file.display_name));

    /* If the file exists, create the correct url and check the current src url against it */
    if (homeImage !== undefined) {
        hasHomeImage = true;
        var link = `https://byui.instructure.com/courses/${course.id}/files/${homeImage.id}/preview`;

        /* Check if the image src is correct */
        var correctLink = false;
        if (src === link) {
            correctLink = true;
        }
    }

    /* Set the correct text for the first <h2> tag */
    var goodh2 = `Welcome to ${courseCode} - `;

    /* Check if the class names on the div wrapper are correct */
    var divWrapper = false;
    if (classNames === `byui ${classCode}`) {
        divWrapper = true;
    }

    /* Check if the h2 text is correct */
    var correcth2 = false;
    if (h2.includes(goodh2)) {
        correcth2 = true;
    }

    /* If any of the three above checks fail, log it */
    if (divWrapper === false || homeImage === undefined || correctLink === false || correcth2 === false) {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Title': course.wrapLink(item.getUrl(), item.getTitle()),
            'ID': item.getId(),
            'Has homeImage.jpg': hasHomeImage,
            'Correct Image Source': correctLink,
            'Correct <div> Wrapper Classes': divWrapper,
            'Correct <h2> Text': correcth2,
        });
    }

};

module.exports.details = {
    filename: 'pages_homepage', // exclude .js
    title: 'Homepage Standards',
    description: 'This course\'s homepage does not meet standards.',
    types: [
        'Page',
    ]
};