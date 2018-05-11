const fileType = require('../misc_scripts/fileType.js');

module.exports = (item, logger) => {

    if (item.constructor.name !== 'File') {
        return;
    } else if (fileType(item.display_name) === 'video' || fileType(item.display_name) === 'audio') {
        logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
            'Filename': course.wrapLink(item.html_url, item.getTitle()),
            'ID': item.id,
            'Size': `${Math.round(item.size / 1000000)} MB`
        });
    }
};

module.exports.details = {
    filename: 'files_video_audio',
    title: 'Video/Audio Files',
    description: 'Any audio or video files in the course are shown here.',
    types: ['File']
};