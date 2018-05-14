module.exports = (item, logger, course) => {
    // An array of the types that should be run
    if (!module.exports.details.types.includes(item.constructor.name)) {
        return;
    }

    /* Only apply check to the course homepage */
    if (!item.getTitle().includes('Course Homepage')) {
        return;
    }

    // var srcUrl = `https://byui.instructure.com/courses/${courseOU}/files/${homeImage.jpg ID}/preview`;
    // var className = `byui ${course code}`;
    // var welcome = `Welcome to ${CAPSCOURSECODE NUMBER} - ${course title} (RN-BSN)`; // idk what the (RN-BSN) is supposed to be
    
    // https://byui.instructure.com/courses/11619/pages/course-homepage
    // <div class="byui nurs449"><img class="full" src="https://byui.instructure.com/courses/11619/files/1102102/preview" alt="homeImage (2).jpg" width="1800" height="540" data-api-endpoint="https://byui.instructure.com/api/v1/courses/11619/files/1102102" data-api-returntype="File" />
    // <h2>Welcome to NURS 449 - Community Nursing (RN-BSN)</h2>

    // Change class from 'byui oct' to 'byui coursecodenospaces' (i.e. 'byui nurs449')
    // Change <h2> to whatever the course code thing should be
    // Change <img> src to be the class image

    /* Test the module name against the naming convention regex */
    // var found = namingConvention.find(convention => convention.regex.test(item.getTitle()));

    // /* If it the module name doesn't follow the naming convention, log it */
    // if (found === undefined) {
    //     logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
    //         'Title': course.wrapLink(item.getUrl(), item.getTitle()),
    //         'ID': item.getId(),
    //     });
    // }

};

module.exports.details = {
    filename: 'folders_main', // exclude .js
    title: 'Module Naming Conventions',
    description: 'These Modules do not follow the standardized naming conventions',
    types: [
        'Module',
    ]
};