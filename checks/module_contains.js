const canvas = require('canvas-api-wrapper');

module.exports = (item, logger, course) => {
    /* Determine which item types to run it on */
    if (item.constructor.name !== 'Module') {
        return;
    }

    /* Make each module its own object with the module name, the regex for that name, 
    and all the module items that should be in that module, as well as the module items' regex */
    var standardItems = [{
            moduleName: 'Student Resources',
            moduleReg: /student\s*resources/i,
            moduleItems: [
                'Supplemental Resources',
                'Standard Resources',
                'University Policies',
                'Online Support Center',
                'Library Research Guides',
                'Academic Support Center',
                'Copyright & Source Information',
            ],
            moduleItemRegs: [
                /Supplemental\sResources/gi,
                /Standard\sResources/gi,
                /University\sPolicies/gi,
                /Online\sSupport\sCenter/gi,
                /Library\sResearch\sGuides/gi,
                /Academic\sSupport\sCenter/gi,
                /Copyright\s&\sSource\sInformation/gi,
            ]
        }, {
            moduleName: 'Instructor Resources',
            moduleReg: /instructor\s*resources/i,
            moduleItems: [
                'Standard Resources',
                'Setup for Course Instructor',
                'General Teaching Notes',
                'Release Notes',
                'Design Workbook',
                'Teaching Group Directory',
                'Online Instructor Community',
                'Course Maintenance Log',
                'Supplemental Resources',
            ],
            moduleItemRegs: [
                /Standard\sResources/gi,
                /Setup\sfor\sCourse\sInstructor/gi,
                /General\sTeaching\sNotes/gi,
                /Release\sNotes/gi,
                /Design\sWorkbook/gi,
                /Teaching\sGroup\sDirectory/gi,
                /Online\sInstructor\sCommunity/gi,
                /Course\sMaintenance\sLog/gi,
                /Supplemental\sResources/gi,
            ],
        },
        {
            moduleName: 'Week 06',
            moduleReg: /Week\s06:/i,
            moduleItems: [
                'Mid-Course Feedback (or named something similar)',
            ],
            moduleItemRegs: [
                /mid\d*\D*(course|semester)\d*\D*(feedback|evaluation)/gi,
            ],
        },
        {
            moduleName: 'Week 13',
            moduleReg: /Week\s13:/i,
            moduleItems: [
                'End of Course Feedback (or named something similar)',
            ],
            moduleItemRegs: [
                /(course|semester)\d*\D*(feedback|evaluation)/gi,
            ],
        }
    ];

    // Does the current item match any of the moduleName things in the array
    // If so, do any of their module items match the standardItemName in those objects

    standardItems.forEach(standardItem => { // loop throught the module names in standardItems
        if (standardItem.moduleReg.test(item.getTitle())) { // if the module's name being tested matches one in the standardItems array
            standardItem.moduleItemRegs.forEach((reg, i) => { // loop through that module's standard module items
                var found = item.items.find(currItem => reg.test(currItem.title)); // find any module items on the item that matches one in standardItems                
                if (found === undefined) { // if no match was found, log it
                    logger.log(course.wrapTitle(module.exports.details.title, item.constructor.name), {
                        'Module Item Title': standardItem.moduleItems[i],
                        'Module Title': item.getTitle(),
                        'Module ID': item.getId(),
                    });
                }
            });
        }
    });
};

module.exports.details = {
    filename: 'module_contains', // exclude .js
    type: 'module_item_should_exist',
    title: 'Required Module Items',
    description: 'These required module items are missing from the course.',
    types: ['Module']
};