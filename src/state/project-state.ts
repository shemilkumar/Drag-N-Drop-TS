import { Project,ProjectStatus } from "../models/project-model";

type Listener<T> = (items: Project[]) => void;

class State<T>{
    protected listeners: Listener<T>[] = [];

    addListeners(listenersFn: Listener<T>) {
        this.listeners.push(listenersFn);
    }
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) return this.instance;
        return this.instance = new ProjectState();
    }


    addProjects(title: string, desc: string, people: number) {
    
        const newProject = new Project((Math.random() * 1000000000).toString(), title, desc, people, ProjectStatus.Active)
    
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(prjId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === prjId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenersFn of this.listeners) listenersFn(this.projects.slice());
    }
}

export const projectState = ProjectState.getInstance();
