// type Listener = (projects: Project[]) => void;
import {Project, ProjectStatus} from "../models/project.model.js";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// project state manager
export class ProjectState extends State<Project> {
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
export const projectState = ProjectState.getInstance();
