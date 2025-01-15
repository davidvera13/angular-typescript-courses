interface HasId {
    id:string;
}
interface HasTitle {
    title:string;
    description:string;
}

type Course = HasId & HasTitle;

const course: Course = {
    id: 'id is required',
    title: 'Title is required',
    description: 'Description is also required'
}