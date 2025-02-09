
// component base class: not to be instanciated ...
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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