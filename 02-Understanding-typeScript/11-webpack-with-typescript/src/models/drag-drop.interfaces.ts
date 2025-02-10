// drag & drop interfaces
export interface Draggable {
    // 2 event listeners and handler
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
export interface DragTarget {
    // 3 event handler
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
}
