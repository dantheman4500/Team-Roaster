const Manager = require("./lib/manger");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "Homepage.html");

const render = require("./src/page_template");

const teamMembers = [];
const idArray = [];


function appMenu() {
  function createManager() {
    console.log("Who is part of your team?");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the team manager name?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the team manager id?",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the team manager email?",
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the team manager office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I do not want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer id?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer email?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer GitHub username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern name?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern id?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern email?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern school?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    //* Create the output directory if the dist path doesn"t exist
    //! make sure you delete the dist the home page file before you run this coomand
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();

