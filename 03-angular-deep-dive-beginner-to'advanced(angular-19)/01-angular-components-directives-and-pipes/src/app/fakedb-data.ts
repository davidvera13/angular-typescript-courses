import {Course} from './model/course';

export const COURSES: any = [
    undefined,
    {
        id: 1,
        description: "Angular Core Deep Dive",
        //iconUrl: './assets/images/angular-core-in-depth-small.png',
        longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
        category: 'INTERMEDIATE',
        lessonsCount: 10
    },
    {
        id: 2,
        description: "RxJs In Practice Course",
        //iconUrl: './assets/images/rxjs-in-practice-course.png',
        longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
        category: 'I CANT TELL...',
        lessonsCount: 10
    },

    {
        id: 3,
        description: 'NgRx In Depth',
        longDescription: "Learn the modern Ngrx Ecosystem, including Store, Effects, Router Store, Ngrx Entity, Dev Tools and Schematics.",
        iconUrl: './assets/images/angular-ngrx-course.png',
        category: 'ADVANCED'
    },

    {
        id: 4,
        description: "Angular for Beginners",
        iconUrl: './assets/images/angular2-for-beginners-small-v2.png',
        longDescription: "Establish a solid layer of fundamentals, learn what's under the hood of Angular",
        category: 'BEGINNER',
        lessonsCount: 10
    },
    {
        id: 5,
        description: 'Angular Security Course',
        longDescription: "Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.",
        iconUrl: './assets/images/security-cover-small-v2.png',
        category: 'ADVANCED',
        lessonsCount: 11
    },
    {
        id: 6,
        description: 'Angular PWA Course',
        longDescription: "<p class='course-description'>Learn Angular Progressive Web Applications, build the future of the Web Today.",
        iconUrl: './assets/images/angular-pwa-course.png',
        category: 'ADVANCED',
        lessonsCount: 8
    },
    {
        id: 7,
        description: 'Angular Advanced Course',
        longDescription: "Learn Advanced Angular functionality typically used in Library Development. Advanced Components, Directives, Testing, Npm",
        iconUrl: './assets/images/advanced_angular-small-v3.png',
        category: 'ADVANCED'
    },
    {
        id: 8,
        description: 'Complete Typescript Course',
        longDescription: "Complete Guide to Typescript From Scratch: Learn the language in-depth and use it to build a Node REST API.",
        iconUrl: './assets/images/typescript-2-small.png',
        category: 'BEGINNER'
    },
    {
        id: 9,
        description: 'Angular Architecture Course',
        longDescription: "Learn the core RxJs Observable Pattern as well and many other Design Patterns for building Reactive Angular Applications.",
        iconUrl: './assets/images/rxjs-reactive-patterns-small.png',
        category: 'BEGINNER'
    },
    {
        id: 10,
        description: "Angular Material Course",
        iconUrl: "./assets/images/material_design.png",
        longDescription: "Build Applications with the official Angular Widget Library",
        category: 'ADVANCED'
    }

];


export function findCourseById(courseId:number) {
    return COURSES.find((course: Course) => course.id === courseId);
}
