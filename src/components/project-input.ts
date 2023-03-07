import { Component } from "./base-component";
import { Autobind } from "../decorators/autobind";
import { validate } from "../util/validation";
import { projectState } from "../state/project-state";

    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
        
            this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;

            this.configure();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }

        renderContent(): void { }

        private gatherUserInputs(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDesc = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable = {
                value: enteredTitle,
                required: true,
            }

            const descValidatable = {
                value: enteredDesc,
                required: true,
                minLength: 5
            }

            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            }


            if (!validate(titleValidatable) ||
                !validate(descValidatable) ||
                !validate(peopleValidatable)) {
                alert("Invalid input, Please try again");
                return;
            }

            return [enteredTitle, enteredDesc, +enteredPeople];
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        @Autobind
        private submitHandler(e: Event) {
            e.preventDefault();
            const userInput = this.gatherUserInputs();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                projectState.addProjects(title, desc, people);
                // this.clearInputs();
            }
        }
    }
