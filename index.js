const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

var employees = [];
let createQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your employee ID?",
        name: "ID"
    }
];


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your employer ID?",
            name: "ID"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"

        },

    ])
    .then(function (answers) {
      
        var manager = new Manager(answers.name, answers.ID, answers.email, answers.officeNumber);
       
        employees.push(manager);
        freshEmployees();
    });


const freshEmployees = () => {
    inquirer.prompt({
        type: "input",
        message: "would you like to add a new employee?",
        name: "freshEmployee"
    })
        .then(function (answers) {
            if (answers.freshEmployee === "yes") {
                inquirer.prompt({

                    type: "list",
                    name: "role",
                    messagge: "What is employee position you want to create?",
                    choices: ["Engineer", "Intern"]

                })
                    .then(function (choices) {
                        if (choices.role === "Engineer") {
                            var gitHubQuestion = {
                                type: "input",
                                name: "github",
                                message: "What is your Github username?"
                            }
                            var engineerQs = createQuestions.slice();
                            engineerQs.push(gitHubQuestion);
                            inquirer.prompt(engineerQs)


                                .then(function (answers) {
                                    var engineer = new Engineer(answers.name, answers.ID, answers.email, answers.github)
                                    employees.push(engineer);
                                    freshEmployees();


                                });
                        }
                        if (choices.role === "Intern") {
                            var internQuestion = {
                                type: "input",
                                name: "school",
                                message: "What is your school name?"
                            }
                            var internQs = createQuestions.slice();
                            internQs.push(internQuestion);
                            inquirer.prompt(internQs)


                                .then(function (answers) {
                                    var intern = new Intern(answers.name, answers.ID, answers.email, answers.school)
                                    employees.push(intern);
                                    needsEmployees();

                                });
                        }

                    });
            } else {
                console.log(employees);
                render(employees);
                var htmlString = render(employees);
                fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, htmlString);
                return employees;
            }

        })
}