// drag & drop interfaces
interface Draggable {
    // 2 event listeners and handler
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;

}
interface DragTarget {
    // 3 event handler
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
}
// project types
enum ProjectStatus {
    ACTIVE = 'Active', FINISHED = 'Finished'
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public projectStatus: ProjectStatus) {
    }
}

// type Listener = (projects: Project[]) => void;
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// project state manager
class ProjectState extends State<Project> {
    //private listeners: Listener[] = []
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    //addListener(listener: Listener) {
    //    this.listeners.push(listener);
    //}
    addProject(title: string, description: string, people: number): void {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus): void {
        const currentProject = this.projects.find(project => project.id === projectId);
        if (currentProject && currentProject.projectStatus !== newStatus) {
            currentProject.projectStatus = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listener of this.listeners) {
            // passing a copy of the array
            listener(this.projects.slice());
        }
    }
}

// single instance of project state
const projectState = ProjectState.getInstance();


// Creating & Using an "Autobind" Decorator
// TS6133: 'target' is declared but its value is never read.
// TS6133: 'methodName' is declared but its value is never read.
function Autobind(
    _: any,             //target: any,
    __: string,         // methodName: string,
    descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedMethod: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundedFn = originalMethod.bind(this);
            return boundedFn;
        }
    }
    return adjustedMethod;
}

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    // is required : must have length > 0
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // minLength applies to string if minLength is set
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    // maxLength applies to string if maxLength is set
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    // min applies to numeric values
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    // max applies to numeric values
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// component base class: not to be instanciated ...
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElt: HTMLTemplateElement;
    hostElt: T; // using generic
    elt: U;     // using generic

    constructor(
        templateEltId: string,
        hostEltId: string,
        insertAtStart: boolean,
        eltId?: string) {
        this.templateElt = document
            .getElementById(templateEltId)! as HTMLTemplateElement;
        this.hostElt = document
            .getElementById(hostEltId)! as T;

        const importedNode = document.importNode(this.templateElt.content, true);
        this.elt = importedNode.firstElementChild as U;
        if(eltId)
            this.elt.id = eltId;

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        console.log('### attach called!');
        this.hostElt.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'afterend',
            this.elt);
    }

    abstract configure(): void;
    abstract renderContent(): void;

}

// DOM Element Selection & OOP Rendering
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    //templateElt: HTMLTemplateElement;
    //hostElt: HTMLDivElement;
    //elt: HTMLFormElement;
    titleInputElt: HTMLInputElement;
    descriptionInputElt: HTMLInputElement;
    peopleInputElt: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input')
        console.log('### constructor called!');
        // this.templateElt = document.getElementById('project-input')! as HTMLTemplateElement;
        // this.hostElt = document.getElementById('app')! as HTMLDivElement;
        //
        // const importedNode = document.importNode(this.templateElt.content, true);
        // this.elt = importedNode.firstElementChild as HTMLFormElement;
        // this.elt.id = 'user-input';
        // this.titleInputElt = this.elt.querySelector('#title') as HTMLInputElement;
        // this.descriptionInputElt = this.elt.querySelector('#description') as HTMLInputElement;
        // this.peopleInputElt = this.elt.querySelector('#people') as HTMLInputElement;

        this.titleInputElt = this.elt.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElt = this.elt.querySelector('#description') as HTMLInputElement;
        this.peopleInputElt = this.elt.querySelector('#people') as HTMLInputElement;
        this.configure();
        // this.attach();
    }

    //private attach() {
    //    console.log('### attach called!');
    //    this.hostElt.insertAdjacentElement('afterbegin', this.elt);
    //}

    configure() {
        console.log('### configure called!');
        this.elt.addEventListener('submit', this.submitHandler); //.bind(this));
    }

    renderContent() {
        console.log('### renderContent called!');
    }

    @Autobind
    private submitHandler(event: Event) {
        console.log('### submitHandler called!');
        event.preventDefault();
        // this is not binded to the class inside event listener we must do binding in event listener
        console.log('submitHandler() ', event);
        console.log('this.titleInputElt', this.titleInputElt);
        console.log('this.descriptionInputElt', this.descriptionInputElt);
        console.log('this.peopleInputElt', this.peopleInputElt);

        const userInput = this.gatherUserInput();
        console.log('userInput', userInput);
        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            console.log('title', title);
            console.log('description', description);
            console.log('people', people);
            this.clearInputs();
        }
    }
    private clearInputs() {
        this.titleInputElt.value = '';
        this.descriptionInputElt.value = '';
        this.peopleInputElt.value = '';
    }

    // fetching user input
    private gatherUserInput(): [string, string, number] | void{
        console.log('### gatherUserInput called!');
        const enteredTitle = this.titleInputElt.value;
        const enteredDescription = this.descriptionInputElt.value;
        const enteredPeople = this.peopleInputElt.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;

        // dirty way
        // if(
        //     enteredTitle.trim().length === 0 ||
        //     enteredDescription.trim().length === 0 ||
        //     enteredDescription.trim().length === 0) {
        //     alert('Invalid input, try again');
        //     return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
}

class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;
    constructor(hostEltId: string, project: Project) {
        super('single-project', hostEltId, true, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    get persons() {
        return this.project.people == 1 ?
            '1 person' :
            `${this.project.people} persons`;
    }
    configure(): void {
        this.elt.addEventListener('dragstart', this.dragStartHandler);
        this.elt.addEventListener('dragend', this.dragEndHandler)
        // throw new Error("Method not implemented.");
    }
    renderContent(): void {
        // throw new Error("Method not implemented.");
        // we have an h2 and h2 inside li tag
        console.log('### renderContent called!');
        this.elt.querySelector('h2')!.textContent = this.project.title;
        //this.elt.querySelector('h3')!.textContent = this.project.people + ' persons assigned';
        this.elt.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.elt.querySelector('p')!.textContent = this.project.description;
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
        console.log('### dragStartHandler called!', event);
        event.dataTransfer!.setData(
            'text/plain',
            this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    @Autobind
    dragEndHandler(event: DragEvent) {
        console.log('### dragEndHandler called!');
        console.log('dragEndHandler() ', event);
    }
}


// Rendering Project Lists
class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    // in component class
    //templateElt: HTMLTemplateElement;
    //hostElt: HTMLDivElement;
    //elt: HTMLElement;
    assignedProjects: Project[] ;

    constructor(private type: 'active' | 'finished') {
        // 'beforeend' == false
        super('project-list', 'app', false, `${type}-projects` );
        console.log('### constructor called!');
        this.assignedProjects = [];
        //this.templateElt = document.getElementById('project-list')! as HTMLTemplateElement;
        //this.hostElt = document.getElementById('app')! as HTMLDivElement;
        //const importedNode = document.importNode(this.templateElt.content, true);
        //this.elt = importedNode.firstElementChild as HTMLInputElement;
        //this.elt.id = `${type}-projects`;
        //this.attach();
        this.configure();
        this.renderContent();
    }

    //private attach() {
    //    console.log('### attach called!');
    //    this.hostElt.insertAdjacentElement('beforeend', this.elt);
    //}
    configure() {
        console.log('### configure called!');
        this.elt.addEventListener('dragover', this.dragOverHandler);
        this.elt.addEventListener('dragleave', this.dragLeaveHandler);
        this.elt.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.projectStatus === ProjectStatus.ACTIVE;
                }
                return project.projectStatus === ProjectStatus.FINISHED;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        // in h2 tag
        const listId = `${this.type}-projects-list`;
        this.elt.querySelector('ul')!.id = listId;
        this.elt.querySelector('h2')!.textContent = this.type.toString() + ' PROJECT';
    }

    private renderProjects() {
        const listId = `${this.type}-projects-list`;
        const listElt = document.getElementById(listId) as HTMLUListElement;
        listElt.innerHTML = '';
        for (const project of this.assignedProjects) {
            //new ProjectItem(listElt.querySelector('ul')!.id, project);
            new ProjectItem(this.elt.querySelector('ul')!.id, project);


            // add to list
            //const listItem = document.createElement('li');
            //listItem.textContent = project.title;
            //listElt.appendChild(listItem);
        }

    }


    @Autobind
    dropHandler(event: DragEvent): void {
        console.log('### dropHandler called!', event);
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projectId,
            this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED)
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        console.log('### dragLeaveHandler called!', event);
        const listElt = this.elt.querySelector('ul')!;
        listElt.classList.remove('droppable');

    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        console.log('### dragOverHandler called!', event);
        // note we can move only text / plain
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
        }

        const listElt = this.elt.querySelector('ul')!;
        listElt.classList.add('droppable');
    }


}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
