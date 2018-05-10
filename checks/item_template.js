module.exports = (item, logger) => {
    // An array of the types that should be run
    let types = [
        'Assignment',
        'Discussion',
        'File',
        'ModuleItem',
        'Module',
        'Page',
        'Quiz',
        'QuizQuestion',
    ];

    if (!types.includes(item.constructor.name)) {
        return;
    }

    // Example Log
    logger.log(`What it be about&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
        'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
        'ID': item.getId(),
        'etc': 'other stuff'
    });

    // item.getId()
    // item.getTitle()
    // item.setTitle(title)
    // item.getHtml()
    // item.setHtml(html)
    // item.get(optionalCallback)
    // item.update(optionalCallback)
    // item.delete(optionalCallback)
    // item.create(optionalCallback)
};