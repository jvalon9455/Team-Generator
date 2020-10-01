const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { memberExpression } = require("@babel/types");
const { endianness } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const team = [];

const questionPrompt = [
    {
        type: "confirm",
        message: "Would you like to add a team member?",
        name: "initialQuestion",
    },
];

const teamMember = [
    {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "teamMember",
    },
];

const teamMemberTitle = [
    {
        type: "list",
        message: "Please select the title of the associated member that you would like to add.",
        choices: ["Manager", "Engineer", "Intern"],
        name: "teamMemberTitle",
    },
];

const managerQuestions = [
    {
        type: "input",
        message: "What is the name of your manager?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the ID# of your manager?",
        name: "ID",
    },
    {
        type: "input",
        message: "What is your managers email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your managers office number?",
        name: "officeNumber",
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "What is the name of your engineer?",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is the ID# of your engineer?",
        name: "ID",
    },
    {
        type: "input",
        message: "What is your engineer's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github",
    }
];

const internQuestions = [
    {
        type: "input",
        message: "What is the name of your intern?",
        name: "internName"
    },
    {
        type: "input",
        message: "What is the ID# of your intern?",
        name: "ID",
    },
    {
        type: "input",
        message: "What is your intern's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What school does your intern attend?",
        name: "school",
    }
];


// write function for initial questions

function questions() {
    inquirer
        .prompt(questionPrompt)
        .then(function (data) {
            if (data.initialQuestion === true) {
                memberTitle();
            } else {
                console.log("Add members to your team.")
                endPrompts()
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// write function to add team members

function addTeamMember() {
    inquirer
        .prompt(teamMember)
        .then(function (data) {
            if (data.teamMember === true) {
                memberTitle();
            } else {
                endPrompts()
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// write function to select type of team member user can choose from depending on their title

function memberTitle() {
    inquirer
        .prompt(teamMemberTitle)
        .then(function (data) {
            if (data.teamMemberTitle === "Manager") {
                manager();
            } else if (data.teamMemberTitle === "Engineer") {
                engineer();
            } else if (data.teamMemberTitle === "Intern") {
                intern();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// write different functions for different members

function manager() {
    inquirer
        .prompt(managerQuestions)
        .then(function (data) {
            var newManager = new Manager(data.managerName, data.ID, data.email, data.officeNumber);
            team.push(newManager);
            addTeamMember();
        });
}
function engineer() {
    inquirer
        .prompt(engineerQuestions)
        .then(function (data) {
            var newEngineer = new Engineer(data.engineerName, data.ID, data.email, data.github);
            team.push(newEngineer);
            addTeamMember();
        });
}

function intern() {
    inquirer
        .prompt(internQuestions)
        .then(function (data) {
            var newIntern = new Intern(data.internName, data.ID, data.email, data.school);
            team.push(newIntern);
            addTeamMember();
        });
}

// write function to initialize node js
function init() {
    console.log("Generate team here.")
    questions();
}

init();

// write function to end function

function endPrompts() {
    fs.writeFile(outputPath, render(team), function (err) {
        if (err){
            console.log(err);
        }
        // console.log("It works");
    });
} 
