// DOM Element Selection & OOP Rendering
import {Component} from "./base.component";
import {Autobind} from "../decorators/autobind.decorator";
import {projectState} from "../states/project.states";
import {Validatable, validate} from "../utils/project.validators";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    //templateElt: HTMLTemplateElement;
    //hostElt: HTMLDivElement;
    //elt: HTMLFormElement;
    titleInputElt: HTMLInputElement;
    descriptionInputElt: HTMLInputElement;
    peopleInputElt: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input')
        console.log('### constructor called!');

        this.titleInputElt = this.elt.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElt = this.elt.querySelector('#description') as HTMLInputElement;
        this.peopleInputElt = this.elt.querySelector('#people') as HTMLInputElement;
        this.configure();
    }

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
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
}