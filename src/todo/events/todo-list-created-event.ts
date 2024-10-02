export class TodoListCreatedEvent {
    constructor(
        public readonly userId: string,
        public readonly todoListId:string,
    ) {}
}