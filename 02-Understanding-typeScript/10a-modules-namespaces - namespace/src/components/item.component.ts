/// <reference path="base.component.ts" />
/// <referencepath="../decorators/autobind.decorator.ts" />
/// <referencepath="../decorators/autobind.decorator.ts" />
/// <referencepath="../models/project.model.ts" />
/// <referencepath="../models/drag-drop.interfaces.ts" />

namespace App {
    export class ProjectItem
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
}