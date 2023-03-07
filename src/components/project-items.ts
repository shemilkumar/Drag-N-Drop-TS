import { Component } from "./base-component";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project-model";
import { Autobind } from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    private project: Project;

    get persons(): string {
        if (this.project.people === 1) return "1 Person"
        return `${this.project.people} Persons`
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {
        console.log("End");
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler)
    }


    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + " Assigned";
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
