const Enquirer = require('enquirer');
const enquirer = new Enquirer();

module.exports = async function promptUser(scriptNames) {

    enquirer.register('checkbox', require('prompt-checkbox'));
    /* Register checkboxes and add questions */
    let answer = await enquirer.prompt({
        type: 'checkbox',
        name: 'multipleCourses', 
        message: 'Run on multiple courses?',
        default: 'true',
        choices: ['true']
    });

    if (answer.multipleCourses[0] === 'true') {
        await enquirer.prompt({
            type: 'input',
            name: 'csvPath', 
            message: 'Path to CSV:',
            default: '../russia.csv'
        });
    } else {
        await enquirer.prompt({
            type: 'input',
            name: 'courseID',
            message: 'Canvas Course ID:'
        })
    }
    
    let promptAnswers = await enquirer.prompt({
        type: 'checkbox',
        name: 'checksToRun',
        message: 'Checks to Run:',
        default: scriptNames,
        choices: scriptNames
    });

    return promptAnswers;
}
