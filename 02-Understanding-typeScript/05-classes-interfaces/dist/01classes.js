"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name, comment: "this is a static employee" };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = new Date().getFullYear();
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log("Mandatory implementation ... ");
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("1", []);
        return this.instance;
    }
    describe() {
        console.log(`Accounting Department ${this.id}`);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    get latestReport() {
        if (this.lastReport != undefined) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }
    set latestReport(report) {
        if (report) {
            this.addReport(report);
        }
        else {
            throw new Error("No report provided");
        }
    }
}
const it = new ITDepartment('d1', ['Max']);
it.addEmployee('John');
it.addEmployee('Paul');
it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();
console.log(it);
const accounting = AccountingDepartment.getInstance();
accounting.addReport('Something went wrong...');
accounting.printReports();
let accountingDepartment = AccountingDepartment.getInstance();
console.log(accountingDepartment);
accountingDepartment.describe();
const accountingCopy = { 'name': "I have a name here", description: accountingDepartment.describe };
console.log(accountingCopy.description);
accountingDepartment.addEmployee("John Steed");
accountingDepartment.addEmployee("Emma Peel");
accountingDepartment.printEmployeeInformation();
console.log('********************************');
accountingDepartment.printEmployeeInformation();
console.log('********************************');
console.log('inheritance');
let itDepartment = new ITDepartment("1", []);
itDepartment.addEmployee("John Steed");
itDepartment.addEmployee("Emma Peel");
itDepartment.addEmployee("Tara King");
itDepartment.addEmployee("Cathy Gale");
itDepartment.addEmployee("Purdey");
itDepartment.addEmployee("Gambit");
itDepartment.addEmployee("Mother");
itDepartment.printEmployeeInformation();
accounting.latestReport = 'Custom report';
console.log("latestReport : ", accounting.latestReport);
console.log(accounting.latestReport);
console.log(Math.pow(3, 2));
const employee = Department.createEmployee("John Steed");
console.log(employee);
console.log(Department.fiscalYear);
accounting.describe();
//# sourceMappingURL=01classes.js.map