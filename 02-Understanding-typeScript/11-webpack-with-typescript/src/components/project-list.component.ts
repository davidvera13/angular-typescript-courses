// Rendering Project Lists
import {Component} from "./base.component";
import {DragTarget} from "../models/drag-drop.interfaces";
import {Project, ProjectStatus} from "../models/project.model";
import {projectState} from "../states/project.states";
import {Autobind} from "../decorators/autobind.decorator";
import {ProjectItem} from "./item.component";

export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[] ;

    constructor(private type: 'active' | 'finished') {// 'beforeend' == false
        super('project-list', 'app', false, `${type}-projects` );
        console.log('### constructor called!');
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

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