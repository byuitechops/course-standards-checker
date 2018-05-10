var references = [{
    reg: /!\[CDATA[\s\S]*\]\]/gi,
    type: 'Javascript'
}, {
    reg: /(brightspace)(?!\.com)/gi,
    type: 'Brightspace References'
}, {
    reg: /brainhoney/ig,
    type: 'Brainhoney References'
}, {
    reg: /adobe\s*connect/ig,
    type: 'Adobe Connect References'
}, {
    reg: /((google\s*)?hangouts?(\s*on\s*air)?)|(HOA)/ig,
    type: 'Hangouts on Air References'
}];

var validItems = [
    'Release Notes'
];

module.exports = (item, logger) => {
    if (!module.exports.details.types.includes(item.constructor.name) || validItems.includes(item.getTitle())) {
        return;
    }

    /* Check each regex to see if the item contents has any matches */
    references.forEach(ref => {
        /* Get all the matches */
        var matches = item.getHtml().match(ref.reg);
        /* See if it contains any of what we're looking for... */
        if (matches != null) {
            logger.log(`Contains ${ref.type}&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
                'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
                'Number of References': matches.length,
                'ID': item.getId()
            });
        }
    });
};

module.exports.details = {
    filename: 'universal_references', // exclude .js
    title: 'Large Files',
    description: 'These are files that are over 15 MB in size. Blah blah blah.',
    types: [
        'Assignment',
        'Discussion',
        'Page',
        'Quiz',
    ]
};