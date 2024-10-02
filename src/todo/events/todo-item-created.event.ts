import {Types} from "mongoose";

export class TodoItemCreatedEvent {
    constructor(
        public readonly todoItemId: string,
        public readonly todoListId:string,
    ) {}
}