abstract class Department {
    // private readonly id: string;
    // private name: string;
    private employees: string[] = [];

    // static property
    static fiscalYear = new Date().getFullYear();

    //constructor(private readonly id: string, public name: string) {
    protected constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    static createEmployee(name: string) {
        return { name: name, comment: "this is a static employee" };
    }

    // we want to force all class extending Department to implement describe method
    //describe(this: Department) {
    //    console.log(`Department (${this.id}): ${this.name}`);
    //}
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        // validation etc
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe(): void {
        console.log("Mandatory implementation ... ");
    }


}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    // we want 1 object of this class: we need to use singleton:
    // constructor is private
    // require a static method to get instance
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if(AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("1", []);
        return this.instance;
    }

    // override method from department
    describe(): void {
        console.log(`Accounting Department ${this.id}`);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    // getter and setter
    get latestReport() {
        if (this.lastReport != undefined) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }

    set latestReport(report: string) {
        if(report) {
            this.addReport(report);
        } else {
            throw new Error("No report provided");
        }

    }
}

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('John');
it.addEmployee('Paul');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// oops constructor is private
// const accounting = new AccountingDepartment('d2', []);
// we access as a property, not as a method call
const accounting = AccountingDepartment.getInstance();
accounting.addReport('Something went wrong...');
accounting.printReports();

// TS2511: Cannot create an instance of an abstract class.
// let hrDepartment = new Department("1", "HR");
// let accountingDepartment = new AccountingDepartment("2", ["Report 1", "Report 2", "Report 3"]);
let accountingDepartment = AccountingDepartment.getInstance();
// console.log(hrDepartment);
console.log(accountingDepartment);
// hrDepartment.describe();
accountingDepartment.describe();

const accountingCopy = { 'name': "I have a name here", description: accountingDepartment.describe };
// undefined: accountingCopy has no name property set ...
console.log(accountingCopy.description);

accountingDepartment.addEmployee("John Steed");
accountingDepartment.addEmployee("Emma Peel");
// we can add employees because property is public => make private is more secured
// accountingDepartment.employees.push("Tara King");

accountingDepartment.printEmployeeInformation();
// accountingDepartment.employees[2] = "Purdey";
console.log('********************************');
accountingDepartment.printEmployeeInformation();


// inheritance
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


// getters and setters
//console.log("latestReport : ", accounting.latestReport);
//accounting.latestReport = '';
//console.log("latestReport : ", accounting.latestReport);
accounting.latestReport = 'Custom report';
console.log("latestReport : ", accounting.latestReport);
console.log(accounting.latestReport);

// static methods & properties
// we don't create a new Math object to use pow method
console.log(Math.pow(3,2));
const employee = Department.createEmployee("John Steed");
console.log(employee);

console.log(Department.fiscalYear);

accounting.describe()