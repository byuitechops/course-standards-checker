module.exports = (item, logger, course) => {
    /* Determine which item types to run it on */
    if (item.constructor.name === 'ModuleItem' || item.constructor.name === 'File' || item.constructor.name === 'Module' || item.constructor.name === 'QuizQuestion') {
        return;
    }

    /* If it is a Quiz or Discussion under Assignments, skip it because it is already checked in Quizzes and Discussions */
    if (item.constructor.name === 'Assignment' && (item.quiz_id || item.discussion_topic)) {
        return;
    }

    /* Pages don't have content_ids so we have to check if they are connected to module items through the page urls */
    if (item.constructor.name === 'Page') {
        var moduleItems = course.moduleItemList.filter(moduleItem => moduleItem.page_url !== undefined);
    } else {
        var moduleItems = course.moduleItemList.filter(moduleItem => moduleItem.content_id !== undefined);
    }

    /* Again, check pages through the url instead of through their ids which are different than most ids */
    var found = moduleItems.find(moduleItem => {
        if (item.constructor.name === 'Page') {
            return moduleItem.page_url === item.url;
        } else {
            return moduleItem.content_id === item.getId();
        }
    });

    /* If there was no module item found for the item, log it */
    if (found === undefined) {
        logger.log(`No Associated Module Item&nbsp;<span style="color:#aaa">[${item.constructor.name}]</span>&nbsp;`, {
            'Title': `<a target="_blank" href="${item.html_url}">${item.getTitle()}</a>`,
            'ID': item.getId(),
        });
    }
};