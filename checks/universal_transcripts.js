module.exports = (item, logger, course) => {
    // // An array of the types that should be run
    // if (!module.exports.details.types.includes(item.constructor.name)) {
    //     return;
    // }

    // var $ = cheerio.load(item.getHtml());



    // // Example Log
    // logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
    //     'Title': course.wrapLink(item.getUrl(), item.getTitle()),
    //     'ID': item.getId(),
    //     'etc': 'other stuff'
    // });

};

module.exports.details = {
    filename: 'universal_transcripts',
    title: 'Video Transcripts',
    description: 'These videos in the course\'s HTML do not match the standard.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
        'QuizQuestion',
    ]
};