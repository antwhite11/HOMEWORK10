const Employee = require ("./Employee.js");

class Intern extends Employee {
    constructor (name, id, email, school){
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
        this.getRole = function (){
            return this.role;
        }
        this.getSchool = function (){
            return this.school;
        }
    }
};

module.exports = Intern;


