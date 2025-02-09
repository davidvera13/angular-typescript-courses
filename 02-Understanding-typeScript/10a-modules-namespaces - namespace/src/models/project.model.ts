namespace App {
    // project types
    export enum ProjectStatus {
        ACTIVE = 'Active', FINISHED = 'Finished'
    }

    export class Project {
        constructor(
            public id: string,
            public title: string,
            public description: string,
            public people: number,
            public projectStatus: ProjectStatus) {
        }
    }
}