/* Based off of universal-alt-attribute.js - Need to add more functionality for universal-target-attributes.js */

const cheerio = require('cheerio');

module.exports = (item, logger, course) => {
    // if (item.constructor.name === 'Page') {
    //     return;
    // }

    var tagAttributes = [{
        tag: 'a',
        attribute: 'target',
        value: '_blank',
    }, {
        tag: 'image',
        attribute: 'alt',
        value: null,
    }];

    function loadTags(tag, attribute) {
        var $ = cheerio.load(item.getHtml());
        var tags = $(`${tag}`);

        tags.forEach(currTag => {
            var attributes = $(currTag).attr(`${attribute}`);
            if (!attributes || attributes === '') {
                logger.log(`Tags without specific attribute&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
                    'Title': item.getTitle(),
                    'ID': item.getId(),
                    'Tag': tag,
                    'Attribute': attribute,
                });
            }
        });

    }

    tagAttributes.forEach(tagAttribute => {
        loadTags(tagAttribute.tag, tagAttribute.attribute);
    }); 
};